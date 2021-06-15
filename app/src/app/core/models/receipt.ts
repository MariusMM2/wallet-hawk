import {SubmissionBudgetItem} from './budgetItem';

export interface Receipt {
    id: string;
    galleryId: string;
    description: string;
    date: Date;
    image: File | string;
    budgetItemIds: string[];
}

export interface SubmissionReceipt {
    id: string | null;
    galleryId: string;
    description: string;
    date: Date | string;
    image: File;
    budgetItemIds: string[];
    budgetItems: Array<SubmissionBudgetItem>;
}
