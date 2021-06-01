import {Component, Input, OnChanges, OnInit} from '@angular/core';
import ChartUtils, {Dataset} from '../../utilities/chart.utils';
import uuid from 'uuid';
import {Chart, ChartOptions} from 'chart.js';
import {DateUtils} from '../../utilities/date.utils';
import {locale} from '../../../app.config';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {

    @Input() daysCount: number = DateUtils.daysPerMonth;
    @Input() toggleableDatasets: boolean = true;
    @Input() budgetItemDataPoints: Array<Dataset> = [];
    @Input() title: string | null = null;

    private chart: Chart;

    ngOnChanges() {
        if (this.chart) {
            this.updateChart();
        }
    }

    ngOnInit() {
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
        element.id = uuid.v4();
        this.chart = new Chart(element, {
            type: 'line',
            data: {
                labels: DateUtils.getDayLabels().slice(0, this.daysCount),
                datasets: []
            },
            options
        });

        this.updateChart();
    }

    private updateChart() {
        if (this.chart) {
            const datasets = this.chart.data.datasets;
            datasets.splice(0, datasets.length, ...this.getColoredDatasets());

            this.chart.update();
        }
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
