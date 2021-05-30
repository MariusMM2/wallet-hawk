import {BudgetItem} from '../../core/models/budgetItem';
import {Category} from '../../core/models/category';

export interface DialogBudgetItemData extends BudgetItem {
    id: string | null;
    allCategories: Array<Category>;
    priceType: string | null;
}

export interface ConfirmationDialogData {
    title: string;
    message: string;
}
