import {Component, Input, OnInit} from '@angular/core';
import ChartUtils, {Dataset} from '../../utilities/chart.utils';
import {v4 as uuidv4} from 'uuid';
import {Chart, ChartOptions} from 'chart.js';
import {DateUtils} from '../../utilities/date.utils';
import {locale} from '../../../app.config';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

    @Input() daysCount: number = DateUtils.daysPerMonth;
    @Input() toggleableDatasets: boolean = true;
    @Input() budgetItemDataPoints: Array<Dataset> = [];
    @Input() title: string | null = null;

    private chart: Chart;

    ngOnInit() {
        const data = {
            labels: DateUtils.getDayLabels().slice(0, this.daysCount),
            datasets: this.getColoredDatasets(),
        };

        let options: ChartOptions<'line'> = {
            locale,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: this.toggleableDatasets ? {} : {
                    onClick() {
                    }
                },
                title: {
                    display: !!this.title,
                    text: this.title
                }
            }
        };

        const element = <HTMLCanvasElement> document.getElementById('chart');
        // give the canvas element a unique id
        element.id = uuidv4();
        this.chart = new Chart(element, {
            type: 'line',
            data,
            options
        });
    }

    private getColoredDatasets() {
        let datasetCount = 0;
        return this.budgetItemDataPoints.map(budgetItemDataPoint => {
            const datasetIndex = datasetCount++;
            return {
                backgroundColor: ChartUtils.monthColor[datasetIndex],
                borderColor: ChartUtils.monthColor[datasetIndex],
                ...budgetItemDataPoint
            };
        });
    }
}
