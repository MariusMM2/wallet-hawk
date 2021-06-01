import {Pipe, PipeTransform} from '@angular/core';
import {OfYearPipe} from './of-year.pipe';
import {BudgetItem} from '../../core/models';
import {DateUtils} from '../utilities/date.utils';

/**
 * Angular Pipe that filters budget items to the current year.
 */
@Pipe({
    name: 'ofCurrentYear'
})
export class OfCurrentYearPipe implements PipeTransform {

    constructor(private ofYear: OfYearPipe) {
    }

    transform(budgetItems: Array<BudgetItem>): Array<BudgetItem> {
        const currentYear = DateUtils.getCurrentYear();
        return this.ofYear.transform(budgetItems, currentYear);
    }
}
