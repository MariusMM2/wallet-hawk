import {Pipe, PipeTransform} from '@angular/core';
import {BudgetItem} from '../../core/models/budgetItem';
import ChartUtils, {DateMonth} from '../utilities/chart.utils';

/**
 * Angular Pipe that filters budget items to a specific month.
 */
@Pipe({
    name: 'month'
})
export class MonthPipe implements PipeTransform {

    transform(budgetItems: Array<BudgetItem>, monthName: DateMonth): Array<BudgetItem> {
        const monthSpecificItems = budgetItems.filter(budgetItem => {
            const monthIndex = budgetItem.date.getMonth();
            return ChartUtils.monthLabels[monthIndex] === monthName;
        });

        console.log(monthSpecificItems);

        return monthSpecificItems;
    }
}
