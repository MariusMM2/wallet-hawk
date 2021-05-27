import {Component, Input, OnInit} from '@angular/core';
import ChartUtils, {Dataset} from '../../utilities/chart.utils';
import {v4 as uuidv4} from 'uuid';
import {Chart, ChartOptions} from 'chart.js';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

    @Input() toggleableDatasets: boolean = true;
    @Input() budgetItemDataPoints: Array<Dataset> = [];

    private chart: Chart;

    ngOnInit() {
        let datasetCount = 0;
        const data = {
            labels: ChartUtils.getDayLabels(),
            datasets: this.budgetItemDataPoints.map(budgetItemDataPoint => {
                const datasetIndex = datasetCount++;
                return {
                    backgroundColor: ChartUtils.monthColor[datasetIndex],
                    borderColor: ChartUtils.monthColor[datasetIndex],
                    ...budgetItemDataPoint
                };
            }),
        };

        let options: ChartOptions<'line'> = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: this.toggleableDatasets ? {} : {
                    onClick() {
                    }
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
}
