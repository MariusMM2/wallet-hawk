import {Pipe, PipeTransform} from '@angular/core';
import {BudgetItem} from '../../core/models/budgetItem';
import {Dataset} from '../utilities/chart.utils';
import {OfMonthPipe} from './of-month.pipe';
import {DataPointsPipe} from './data-points.pipe';
import {DateUtils} from '../utilities/date.utils';
import {OfCurrentMonthPipe} from './of-current-month.pipe';

/**
 * Angular Pipe that calls the Data Points Pipe for every month in the calendar or until the current month, with the given budget items.
 */
@Pipe({
    name: 'divideByMonth'
})
export class DivideByMonthPipe implements PipeTransform {

    constructor(private ofMonth: OfMonthPipe, private ofCurrentMonth: OfCurrentMonthPipe, private dataPoints: DataPointsPipe) {
    }

    /**
     * @param {Array<BudgetItem>} budgetItems
     * @param {boolean} untilToday Whether or not the transformation should continue past the current month
     */
    transform(budgetItems: Array<BudgetItem>, untilToday: boolean = false): Array<Dataset> {
        const lastMonthIndex = untilToday ? DateUtils.getCurrentMonthIndex() + 1 : DateUtils.monthLabels.length;

        // Fill the dataset with the month labels of either every month,
        // or of the months from January until today's month
        let dataset: Array<Dataset>;
        if (untilToday) {
            dataset = new Array<Dataset>();
            for (let i = 0; i < lastMonthIndex; i++) {
                dataset[i] = {
                    label: DateUtils.monthLabels[i],
                    data: []
                };
            }
        } else {
            dataset = DateUtils.monthLabels.map(label => ({label, data: []}));
        }

        // fill the data of every dataset of a month
        for (let i = 0; i < lastMonthIndex - 1; i++) {
            const monthLabel = DateUtils.monthLabels[i];
            const monthItems = this.ofMonth.transform(budgetItems, monthLabel);

            dataset[i].data = this.dataPoints.transform(monthItems);
        }

        // the last month in the dataset is either December or the current month,
        // if it is the current month, only get the data points from the beginning of the current month
        // until today
        let monthItems;
        if (untilToday) {
            monthItems = this.ofCurrentMonth.transform(budgetItems);
        } else {
            monthItems = this.ofMonth.transform(budgetItems, DateUtils.monthLabels[lastMonthIndex - 1]);
        }
        dataset[lastMonthIndex - 1].data = this.dataPoints.transform(monthItems, !untilToday);

        return dataset;
    }

}
