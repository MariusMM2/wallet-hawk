import {Component, Input, OnInit} from '@angular/core';
import ChartUtils, {Dataset} from '../../utilities/chart.utils';
import {v4 as uuidv4} from 'uuid';
import {Chart, ChartOptions} from 'chart.js';
import {locale} from '../../../app.config';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

    @Input() toggleableDatasets: boolean = true;
    @Input() budgetItemDataPoints: Array<Dataset> = [];
    @Input() labels: Array<string> = [];
    @Input() title: string | null = null;

    private chart: Chart;

    constructor() {
    }

    ngOnInit() {
        const data = {
            labels: this.labels,
            datasets: [{
                label: (this.budgetItemDataPoints)[0].label,
                data: (this.budgetItemDataPoints)[0].data,
                backgroundColor: ChartUtils.categoryColor,
                hoverOffset: 10
            }]
        };

        let options: ChartOptions<'pie'> = {
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
            type: 'pie',
            data,
            options
        });
    }
}
