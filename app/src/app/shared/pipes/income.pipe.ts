import {Pipe, PipeTransform} from '@angular/core';
import {BudgetItem} from '../../core/models';

/**
 * Angular Pipe that filters only budget items with a positive amount.
 */
@Pipe({
    name: 'income'
})
export class IncomePipe implements PipeTransform {

    transform(budgetItems: Array<BudgetItem>): Array<BudgetItem> {
        return budgetItems.filter(budgetItem => budgetItem.totalPrice > 0);
    }
}
