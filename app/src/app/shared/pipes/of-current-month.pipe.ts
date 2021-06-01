import {Pipe, PipeTransform} from '@angular/core';
import {OfMonthPipe} from './of-month.pipe';
import {BudgetItem} from '../../core/models';
import {DateUtils} from '../utilities/date.utils';

/**
 * Angular Pipe that filters budget items from the beginning of the current month to the current
 * today day of the month.
 */
@Pipe({
    name: 'ofCurrentMonth'
})
export class OfCurrentMonthPipe implements PipeTransform {

    constructor(private ofMonth: OfMonthPipe) {
    }

    transform(budgetItems: Array<BudgetItem>): Array<BudgetItem> {
        const currentMonth = DateUtils.getCurrentMonth();
        const currentDate = DateUtils.getDateOfCurrentMonth();
        return this.ofMonth.transform(budgetItems, currentMonth, currentDate);
    }
}
