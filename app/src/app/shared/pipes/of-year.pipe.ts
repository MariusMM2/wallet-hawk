import {Pipe, PipeTransform} from '@angular/core';
import {BudgetItem} from '../../core/models';
import {DateUtils} from '../utilities/date.utils';

/**
 * Angular Pipe that filters budget items to a specific year.
 */
@Pipe({
    name: 'ofYear'
})
export class OfYearPipe implements PipeTransform {

    transform(budgetItems: Array<BudgetItem>, year: number): Array<BudgetItem> {
        const startDate = new Date(year, 0);
        const endDate = new Date(year, 0);
        endDate.setFullYear(endDate.getFullYear() + 1);

        return DateUtils.filterBudgetItems(budgetItems, startDate, endDate);
    }
}
