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
    isLoading: boolean = false;

    priceTypes: Array<PriceType> = [
        {
            value: 'income',
            viewValue: 'Income'
        },
        {
            value: 'expense',
            viewValue: 'Expense'
        }
    ];

    constructor(private formBuilder: FormBuilder,
                private actions: DataActionsService,
                private store: StoreService,
                private dialogRef: MatDialogRef<BudgetItemModalComponent>,
                @Inject(MAT_DIALOG_DATA) public item: DialogBudgetItemData) {
    }

    ngOnInit(): void {
        this.budgetItemForm = this.formBuilder.group({
            name: [this.item.name || ''],
            description: [this.item.description || ''],
            totalPrice: [Math.abs(this.item.totalPrice || 1),
                Validators.required],
            quantity: [this.item.quantity || 1,
                Validators.required],
            date: [this.item.date || new Date(),
                Validators.required],
            priceType: [(this.item.totalPrice || 1) > 0 ? this.priceTypes[0].value : this.priceTypes[1].value]
        });

        this.categories = this.item.categoryList || [];
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    async onSubmit(event: Event): Promise<void> {
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;
        event.preventDefault();
        if (this.budgetItemForm.valid) {
            const budgetItem: DialogBudgetItemData = {...this.item, ...this.budgetItemForm.value};

            budgetItem.name = budgetItem.name.trim();
            budgetItem.description = budgetItem.description.trim();

            budgetItem.categoryIds = this.categories.map(category => category.id);
            delete budgetItem.allCategories;

            budgetItem.totalPrice = budgetItem.totalPrice * (budgetItem.priceType === 'expense' && -1 || 1);
            delete budgetItem.priceType;

            const result = await this.actions.updateUserBudgetItem(budgetItem);
            if (result) {
                this.dialogRef.close();
            }
        }

        this.isLoading = false;
    }
}

interface PriceType {
    value: 'income' | 'expense';
    viewValue: string;
}
