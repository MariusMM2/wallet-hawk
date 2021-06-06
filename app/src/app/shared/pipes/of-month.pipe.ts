import {Pipe, PipeTransform} from '@angular/core';
import {BudgetItem} from '../../core/models';
import {DateMonth, DateUtils} from '../utilities/date.utils';

/**
 * Angular Pipe that filters budget items to a specific month.
 * This Pipe assumes that all budget items belong to the same year.
 */
@Pipe({
    name: 'ofMonth'
})
export class OfMonthPipe implements PipeTransform {

    transform(budgetItems: Array<BudgetItem>, monthName: DateMonth, endDay?: number, startDay: number = 1): Array<BudgetItem> {
        if (budgetItems.length === 0) {
            return budgetItems;
        }

        const year = budgetItems[0].date.getFullYear();
        const indexOfMonth = DateUtils.monthLabels.indexOf(monthName);
        const startDate = new Date(year, indexOfMonth, startDay);

        let endDate = new Date(startDate.getTime());
        if (endDay) {
            endDate.setDate(endDay + 1);
        } else {
            endDate.setMonth(endDate.getMonth() + 1);
            endDate.setDate(1);
        }

        return DateUtils.filterBudgetItems(budgetItems, startDate, endDate);
    }
}
