import {Pipe, PipeTransform} from '@angular/core';
import {BudgetItem} from '../../core/models/budgetItem';

/**
 * Angular Pipe that filters only budget items with a negative amount.
 */
@Pipe({
    name: 'expense'
})
export class ExpensePipe implements PipeTransform {

    transform(budgetItems: Array<BudgetItem>): Array<BudgetItem> {
        return budgetItems.filter(budgetItem => budgetItem.totalPrice < 0);
    }
}
