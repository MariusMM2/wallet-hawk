import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {BudgetItem, Receipt} from '../../../core/models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataActionsService} from '../../../core/services/data-actions.service';
import {Subscription} from 'rxjs';
import {ConfirmationModalComponent} from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-receipt-preview',
    templateUrl: './receipt-preview.component.html',
    styleUrls: ['./receipt-preview.component.scss']
})
export class ReceiptPreviewComponent implements OnInit, OnChanges, OnDestroy {

    receiptForm: FormGroup;
    isLoading = false;
    canRevert = false;

    @Input() receipt: Receipt | null;
    @Input() budgetItems: Array<BudgetItem> | null;

    private _subscriptions = new Array<Subscription>();

    constructor(private formBuilder: FormBuilder,
                private dialog: MatDialog,
                private actions: DataActionsService) {
    }

    ngOnInit() {
        this.receiptForm = this.formBuilder.group({
            description: [this.receipt.description ?? ''],
        });

        const descriptionFieldSubscription = this.receiptForm.get('description').valueChanges.subscribe(description => {
            this.canRevert = description !== this.receipt.description;
        });
        this._subscriptions.push(descriptionFieldSubscription);
    }

    ngOnChanges(changes: SimpleChanges) {
        const newReceipt: Receipt = changes['receipt'].currentValue;

        if (this.receiptForm) {
            this.receiptForm.get('description').setValue(newReceipt.description);
            // this.canRevert = description !== this.receipt.description;
        }
    }

    ngOnDestroy() {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    onRevert() {
        this.receiptForm.get('description').reset(this.receipt.description ?? 'Hello, Receipt');
    }

    async onDelete() {
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            autoFocus: true,
            data: {
                title: 'Deleting Receipt',
                message: `Are you sure you want to delete '${this.receipt.date ?? 'No title'}'?`,
            }
        });

        const confirmed = await dialogRef.afterClosed().toPromise();

        if (confirmed) {
            await this.actions.deleteReceipt(this.receipt);
        }
    }

    async onSubmit(event: Event): Promise<void> {
        event.preventDefault();

        if (this.isLoading) {
            return;
        }

        this.isLoading = true;
        if (this.receiptForm.valid) {
            const {description} = this.receiptForm.value;
            await this.actions.updateReceipt(this.receipt.id, {description});
        }

        this.isLoading = false;
    }
}
