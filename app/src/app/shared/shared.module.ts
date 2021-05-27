import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {MatModule} from './mat.module';
import {HamburgerMenuComponent} from './components/hamburger-menu/hamburger-menu.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SubmitButtonComponent} from './components/submit-button/submit-button.component';
import {BudgetItemComponent} from './components/budget-item/budget-item.component';
import {AbsolutePipe} from './pipes/absolute.pipe';
import {LimitLabelsPipe} from './pipes/limit-labels.pipe';
import {LineChartComponent} from './components/line-chart/line-chart.component';
import {MonthPipe} from './pipes/month.pipe';
import {DataPointsPipe} from './pipes/data-points.pipe';
import {DivideByMonthPipe} from './pipes/divide-by-month.pipe';

import {Chart, registerables} from 'chart.js';
import {PieChartComponent} from './components/pie-chart/pie-chart.component';
import {CategoryPointsPipe} from './pipes/category-points.pipe';
import {LabelArrayPipe} from './pipes/label-array.pipe';

Chart.register(...registerables);

/**
 * Angular module that contains miscellaneous or small, contained features used by other modules.
 */
@NgModule({
    declarations: [
        SubmitButtonComponent,
        HeaderComponent,
        FooterComponent,
        HamburgerMenuComponent,
        NotFoundComponent,
        BudgetItemComponent,
        AbsolutePipe,
        LimitLabelsPipe,
        MonthPipe,
        DataPointsPipe,
        CategoryPointsPipe,
        DivideByMonthPipe,
        LabelArrayPipe,
        LineChartComponent,
        PieChartComponent
    ],
    imports: [
        CommonModule,
        MatModule,
        ReactiveFormsModule
    ],
    exports: [
        SubmitButtonComponent,
        HeaderComponent,
        FooterComponent,
        NotFoundComponent,
        MatModule,
        ReactiveFormsModule,
        BudgetItemComponent,
        AbsolutePipe,
        LimitLabelsPipe,
        MonthPipe,
        DataPointsPipe,
        CategoryPointsPipe,
        DivideByMonthPipe,
        LabelArrayPipe,
        LineChartComponent,
        PieChartComponent
    ],
    providers: [
        DataPointsPipe,
        MonthPipe
    ]
})
export class SharedModule {
}
