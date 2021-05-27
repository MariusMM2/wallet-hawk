import {Pipe, PipeTransform} from '@angular/core';
import {BudgetItem} from '../../core/models/budgetItem';
import ChartUtils, {Dataset} from '../utilities/chart.utils';
import {MonthPipe} from './month.pipe';
import {DataPointsPipe} from './data-points.pipe';

/**
 * Angular Pipe that calls the Data Points Pipe for every month in the calendar, with the given budget items.
 */

@Pipe({
    name: 'divideByMonth'
})
export class DivideByMonthPipe implements PipeTransform {

    constructor(private month: MonthPipe, private dataPoints: DataPointsPipe) {
    }

    transform(budgetItems: Array<BudgetItem>): Array<Dataset> {
        const dataset = new Array<Dataset>(12);
        dataset.fill(null);

        for (let i = 0; i < ChartUtils.monthLabels.length; i++) {
            let monthLabel = ChartUtils.monthLabels[i];
            const currentMonthItems = this.month.transform(budgetItems, monthLabel);
            dataset[i] = {
                label: monthLabel,
                data: this.dataPoints.transform(currentMonthItems)
            };
        }

        return dataset;
    }

}
