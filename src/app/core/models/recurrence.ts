import {Identifiable} from './identifiable';
import {BudgetItem} from './budgetItem';

export interface Recurrence extends Identifiable {
    originalBudgetItem: BudgetItem;
    active: boolean;
}
