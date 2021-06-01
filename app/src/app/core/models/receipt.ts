import {BudgetItem} from './budgetItem';

export interface Receipt {
    id: string;
    galleryId: string;
    description: string;
    date: Date;
    image: File | string;
    budgetItemIds: string[];
}

export interface SubmissionReceipt extends Receipt {
    id: string | null;
    image: File;
    budgetItems: Array<Partial<BudgetItem>>;
}
