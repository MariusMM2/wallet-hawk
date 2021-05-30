import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from '../shared/shared.module';
import {BudgetItemModalComponent} from './components/budget-item-add-modal/budget-item-modal.component';
import {CategoryPickerComponent} from './components/category-picker/category-picker.component';
import {locale} from '../app.config';
import {MAT_DATE_LOCALE} from '@angular/material/core';

/**
 * Angular Module that contains features related to budget overviews.
 */
@NgModule({
    declarations: [
        DashboardComponent,
        BudgetItemModalComponent,
        CategoryPickerComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule
    ],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: locale
        },
        {
            provide: MAT_DATE_LOCALE,
            useValue: locale
        }
    ]
})
export class DashboardModule {
}
