import {Pipe, PipeTransform} from '@angular/core';
import {BudgetItem} from '../../core/models/budgetItem';
import ChartUtils from '../utilities/chart.utils';

/**
 * Angular Pipe that wraps ChartUtil's getDataPointsForBudgetItems.
 */
@Pipe({
    name: 'dataPoints'
})
export class DataPointsPipe implements PipeTransform {

    transform(budgetItems: Array<BudgetItem>): Array<number> {
        return ChartUtils.getDataPointsForBudgetItems(budgetItems);
    }

}
