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
import {OfMonthPipe} from './pipes/of-month.pipe';
import {DataPointsPipe} from './pipes/data-points.pipe';
import {DivideByMonthPipe} from './pipes/divide-by-month.pipe';

import {Chart, registerables} from 'chart.js';
import {PieChartComponent} from './components/pie-chart/pie-chart.component';
import {CategoryPointsPipe} from './pipes/category-points.pipe';
import {LabelArrayPipe} from './pipes/label-array.pipe';
import {OfYearPipe} from './pipes/of-year.pipe';
import {OfCurrentMonthPipe} from './pipes/of-current-month.pipe';
import {OfCurrentYearPipe} from './pipes/of-current-year.pipe';
import {ExpensePipe} from './pipes/expense.pipe';
import {IncomePipe} from './pipes/income.pipe';
import {SortPipe} from './pipes/sort.pipe';
import {ConfirmationModalComponent} from './components/confirmation-modal/confirmation-modal.component';
import {ImageCardItemComponent} from './components/image-card-item/image-card-item.component';
import {ItemListComponent} from './components/image-card-list/item-list.component';
import {GenericHeaderComponent} from './components/text-header/generic-header.component';
import {FilterByPipe} from './pipes/filter-by.pipe';
import {PercentagePipe} from './pipes/percentage.pipe';
import {OkModalComponent} from './components/ok-modal/ok-modal.component';

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
        ExpensePipe,
        IncomePipe,
        LimitLabelsPipe,
        OfMonthPipe,
        OfCurrentMonthPipe,
        OfYearPipe,
        OfCurrentYearPipe,
        DataPointsPipe,
        CategoryPointsPipe,
        DivideByMonthPipe,
        LabelArrayPipe,
        SortPipe,
        FilterByPipe,
        PercentagePipe,
        LineChartComponent,
        PieChartComponent,
        ConfirmationModalComponent,
        OkModalComponent,
        ImageCardItemComponent,
        ItemListComponent,
        GenericHeaderComponent
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
        ExpensePipe,
        IncomePipe,
        LimitLabelsPipe,
        OfMonthPipe,
        OfCurrentMonthPipe,
        OfYearPipe,
        OfCurrentYearPipe,
        DataPointsPipe,
        CategoryPointsPipe,
        DivideByMonthPipe,
        LabelArrayPipe,
        SortPipe,
        FilterByPipe,
        PercentagePipe,
        LineChartComponent,
        PieChartComponent,
        ConfirmationModalComponent,
        OkModalComponent,
        ImageCardItemComponent,
        ItemListComponent,
        GenericHeaderComponent
    ],
    providers: [
        DataPointsPipe,
        OfMonthPipe,
        OfCurrentMonthPipe,
        OfYearPipe
    ]
})
export class SharedModule {
}
