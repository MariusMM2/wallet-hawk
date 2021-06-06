import {BudgetItem, Category, Gallery} from '../../core/models';

export interface DialogBudgetItemData {
    budgetItem: Partial<BudgetItem>;
    returnInsteadOfDispatch: boolean | null;
    allCategories: Array<Category>;
}

export interface DialogGalleryData extends Gallery {
    id: string | null;
}

export interface DialogReceiptData {
    galleryId: string;
}

export interface ConfirmationDialogData {
    title: string;
    message: string;
}

export interface OkDialogData {
    title?: string;
    message: string;
}
