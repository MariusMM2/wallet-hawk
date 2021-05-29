import {Pipe, PipeTransform} from '@angular/core';
import {BudgetItem} from '../../core/models/budgetItem';
import ChartUtils from '../utilities/chart.utils';
import {DateUtils} from '../utilities/date.utils';

/**
 * Angular Pipe that wraps ChartUtil's getDataPointsForBudgetItems.
 */
@Pipe({
    name: 'dataPoints'
})
export class DataPointsPipe implements PipeTransform {

    /**
     *
     * @param budgetItems
     * @param fillMissingWithZero
     * @param daysCount
     */
    transform(budgetItems: Array<BudgetItem>, fillMissingWithZero: boolean = true, daysCount: number = DateUtils.daysPerMonth): Array<number> {
        return ChartUtils.getDataPointsForBudgetItems(budgetItems, fillMissingWithZero, daysCount);
    }
}
