import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataActionsService} from '../../../core/services/data-actions.service';
import {StoreService} from '../../../core/services/store.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogBudgetItemData, DialogReceiptData} from '../../../dashboard/types/dialogData';
import {BudgetItem, SubmissionReceipt} from '../../../core/models';
import {TesseractService} from '../../services/tesseract.service';
import {TesseractMessage} from '../../types/tesseractMessage';
import {ConfirmationModalComponent} from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import {BudgetItemModalComponent} from '../../../dashboard/components/budget-item-add-modal/budget-item-modal.component';
import {Subscription} from 'rxjs';
import uuid from 'uuid';

@Component({
    templateUrl: './receipt-modal.component.html',
    styleUrls: ['./receipt-modal.component.scss']
})
export class ReceiptModalComponent implements OnInit, OnDestroy {

    receiptForm: FormGroup;

    isLoading = false;
    budgetItems: Array<Partial<BudgetItem>>;

    selectedImage: File;
    selectedImageContents: string | ArrayBuffer;

    scanningStatus: TesseractMessage = null;

    private allCategories = this.store.getState(state => state.data.categoryList);
    private readonly _subscriptions: Array<Subscription> = [];

    constructor(private formBuilder: FormBuilder,
                private actions: DataActionsService,
                private store: StoreService,
                private dialogRef: MatDialogRef<ReceiptModalComponent>,
                private dialog: MatDialog,
                private tesseract: TesseractService,
                @Inject(MAT_DIALOG_DATA) public data: DialogReceiptData) {
    }

    ngOnInit(): void {
        this.receiptForm = this.formBuilder.group({
            description: [''],
            // do not add disabled: true here, it will break the form submission as the date will not show up
            date: [new Date(),
                Validators.required
            ]
        });

        this.budgetItems = [];

        const dateSubscription = this.receiptForm.get('date').valueChanges.subscribe(date => {
            this.budgetItems = this.budgetItems.map(budgetItem => ({...budgetItem, date}));
        });

        this._subscriptions.push(dateSubscription);
    }

    ngOnDestroy() {
        for (const subscription of this._subscriptions) {
            subscription.unsubscribe();
        }
    }

    cancelDialog(): void {
        this.dialogRef.close();
    }

    async openBudgetItemDialog(budgetItem: Partial<BudgetItem> = {}) {
        const dialogRef = this.dialog.open(BudgetItemModalComponent, {
            disableClose: true,
            autoFocus: true,
            data: {
                budgetItem,
                allCategories: this.allCategories,
                returnInsteadOfDispatch: true
            } as DialogBudgetItemData
        });

        const resultBudgetItem = await dialogRef.afterClosed().toPromise();

        if (!resultBudgetItem) {
            return;
        }

        if (this.budgetItems.includes(budgetItem)) {
            // an existing item was edited
            this.budgetItems = this.budgetItems.map(budgetItem => {
                return budgetItem.id === resultBudgetItem.id ? resultBudgetItem : budgetItem;
            });
        } else {
            // a new item was created
            resultBudgetItem.id = uuid.v4();
            this.budgetItems = [...this.budgetItems, resultBudgetItem];
        }
    }

    async deleteBudgetItem(budgetItem: Partial<BudgetItem>) {
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            autoFocus: true,
            data: {
                title: 'Deleting Budget Item',
                message: `Are you sure you want to delete '${budgetItem.name ?? 'No title'}'?`,
            }
        });

        const confirmed = await dialogRef.afterClosed().toPromise();

        if (confirmed) {
            this.budgetItems = this.budgetItems.filter(listBudgetItem => listBudgetItem.id !== budgetItem.id);
        }
    }

    async onSubmit(event: Event): Promise<void> {
        event.preventDefault();
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;
        if (this.receiptForm.valid) {
            const receipt: SubmissionReceipt = {...this.receiptForm.value};

            receipt.description = receipt.description.trim();

            receipt.budgetItems = [...this.budgetItems];
            receipt.budgetItems = this.budgetItems.map(budgetItem => {
                const newBudgetItem = {
                    ...budgetItem,
                    categoryList: undefined,
                    categoryIds: budgetItem.categoryIds ?? budgetItem.categoryList.map(category => category.id),
                    id: undefined
                };

                delete newBudgetItem.id;
                return newBudgetItem;
            });

            receipt.image = this.selectedImage;

            const result = await this.actions.createReceipt(this.data.galleryId, receipt);
            if (result) {
                this.dialogRef.close();
            }
        }

        this.isLoading = false;
    }

    async openImagePicker() {
        let selectedFileHandle;
        try {
            // @ts-ignore
            [selectedFileHandle] = await window.showOpenFilePicker({
                types: [
                    {
                        description: 'Images',
                        accept: {
                            'image/*': ['.png', '.gif', '.jpeg', '.jpg']
                        }
                    },
                ],
                excludeAcceptAllOption: true,
                multiple: false
            });
        } catch (e) {
            return;
        }

        this.selectedImage = await selectedFileHandle.getFile();
        await this.parseBudgetItems();
    }

    private async parseBudgetItems(): Promise<void> {
        const budgetItems = await this.tesseract.getBudgetItems(this.selectedImage, {
            next: (message) => {
                this.scanningStatus = message;
            },
            complete: () => {
                this.scanningStatus = null;
                this.handleImageChange();
            }
        });

        this.budgetItems = budgetItems.map(budgetItem => {
            return {
                id: uuid.v4(),
                date: this.receiptForm.get('date').value,
                categoryList: [],
                quantity: 1,
                ...budgetItem
            };
        });
    }

    private async handleImageChange(): Promise<void> {
        // instantiate a new FileReader
        const reader = new FileReader();
        // add a listener that sets the profile image
        // when the reader is done reading a file
        reader.onload = () => {
            if (reader.readyState === FileReader.DONE) {
                this.selectedImageContents = reader.result;
            }
        };

        // read the file provided in the <input> tag
        reader.readAsDataURL(this.selectedImage);
    }
}
