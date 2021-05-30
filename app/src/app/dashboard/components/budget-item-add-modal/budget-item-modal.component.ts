import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogBudgetItemData} from '../../types/dialogData';
import {ObservableStore} from '../../../shared/utilities/redux.utils';
import {CoreState} from '../../../core/core.store';
import {Category} from '../../../core/models/category';
import {DataActions} from '../../../core/actions/data.actions';

@Component({
    selector: 'app-budget-item-modal',
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
                private actions: DataActions,
                private store: ObservableStore<CoreState>,
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
