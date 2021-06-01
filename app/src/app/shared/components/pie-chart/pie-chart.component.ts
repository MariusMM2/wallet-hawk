import {Component, Input, OnChanges, OnInit} from '@angular/core';
import ChartUtils, {Dataset} from '../../utilities/chart.utils';
import uuid from 'uuid';
import {Chart, ChartOptions} from 'chart.js';
import {locale} from '../../../app.config';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges {

    @Input() toggleableDatasets: boolean = true;
    @Input() budgetItemDataPoints: Array<Dataset> = [];
    @Input() labels: Array<string> = [];
    @Input() title: string | null = null;

    private chart: Chart;

    ngOnChanges() {
        if (this.chart) {
            this.updateChart();
        }
    }

    ngOnInit() {
        if (this.budgetItemDataPoints.length > 0) {
            const data = {
                labels: this.labels,
                datasets: [{
                    data: (this.budgetItemDataPoints)[0].data,
                    backgroundColor: ChartUtils.categoryColor,
                    hoverOffset: 10
                }]
            };

            const options: ChartOptions<'pie'> = {
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
                type: 'pie',
                data,
                options
            });
        }
    }

    private updateChart() {
        if (this.chart) {
            const datasets = this.chart.data.datasets[0].data;
            for (let i = 0; i < datasets.length; i++) {
                if (datasets[i] !== this.budgetItemDataPoints[0].data[i]) {
                    datasets[i] = this.budgetItemDataPoints[0].data[i];
                }
            }
            this.chart.update();
        }
    }
}
