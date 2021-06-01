import {BudgetItem} from './budgetItem';

export interface Recurrence {
    id: string;
    originalBudgetItem: BudgetItem;
    active: boolean;
}
