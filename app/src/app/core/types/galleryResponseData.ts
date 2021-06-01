import {BudgetItem, Gallery, Receipt} from '../models';

export interface GalleryResponseData {
    galleryList: Array<Gallery>;
    receiptList: Array<Receipt>;
    budgetItemList: Array<BudgetItem>;
}
