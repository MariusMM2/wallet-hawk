import {BudgetItem, Category} from '../../core/models';

export interface DialogBudgetItemData extends BudgetItem {
    id: string | null;
    allCategories: Array<Category>;
    priceType: string | null;
}

export interface ConfirmationDialogData {
    title: string;
    message: string;
}
