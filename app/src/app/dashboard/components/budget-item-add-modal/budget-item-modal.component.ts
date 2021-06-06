import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogBudgetItemData} from '../../types/dialogData';
import {StoreService} from '../../../core/services/store.service';
import {Category} from '../../../core/models';
import {DataActionsService} from '../../../core/services/data-actions.service';

@Component({
    templateUrl: './budget-item-modal.component.html',
    styleUrls: ['./budget-item-modal.component.scss']
})
export class BudgetItemModalComponent implements OnInit {

    budgetItemForm: FormGroup;

    categories: Array<Category> = [];
    isLoading = false;

    priceTypes: Array<PriceType> = [
        {
            value: 'expense',
            viewValue: 'Expense'
        },
        {
            value: 'income',
            viewValue: 'Income'
        }
    ];

    constructor(private formBuilder: FormBuilder,
                private actions: DataActionsService,
                private store: StoreService,
                private dialogRef: MatDialogRef<BudgetItemModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogBudgetItemData) {
    }

    ngOnInit(): void {
        const item = this.data.budgetItem;
        this.budgetItemForm = this.formBuilder.group({
            name: [item?.name ?? ''],
            description: [item?.description ?? ''],
            totalPrice: [Math.abs(item?.totalPrice ?? 100) / 100,
                Validators.required
            ],
            quantity: [item?.quantity ?? 1,
                Validators.required
            ],
            // do not add disabled: true here, it will break the form submission as the date will not show up
            date: [item?.date ?? new Date(),
                Validators.required
            ],
            priceType: [(item?.totalPrice ?? -1) > 0 ? this.priceTypes[1].value : this.priceTypes[0].value]
        });

        this.categories = item?.categoryList ?? [];
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    async onSubmit(event: Event): Promise<void> {
        event.preventDefault();
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;
        if (this.budgetItemForm.valid) {
            const budgetItem = {...this.data.budgetItem, ...this.budgetItemForm.value};

            budgetItem.name = budgetItem.name.trim();
            budgetItem.description = budgetItem.description.trim();

            budgetItem.categoryIds = this.categories.map(category => category.id);

            budgetItem.totalPrice = budgetItem.totalPrice * 100 * (budgetItem.priceType === 'expense' && -1 || 1);
            delete budgetItem.priceType;

            delete budgetItem.returnInsteadOfDispatch;
            if (this.data.returnInsteadOfDispatch) {
                budgetItem.categoryList = this.categories;
                this.dialogRef.close(budgetItem);
            } else {
                const result = await this.actions.upsertUserBudgetItem(budgetItem);
                if (result) {
                    this.dialogRef.close();
                }
            }
        }

        this.isLoading = false;
    }
}

interface PriceType {
    value: 'income' | 'expense';
    viewValue: string;
}
