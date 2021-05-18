import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StatisticsRoutingModule} from './statistics-routing.module';
import {StatisticsComponent} from './statistics.component';

/**
 * Angular Component that manages budget statistics and exports.
 */
@NgModule({
    declarations: [
        StatisticsComponent
    ],
    imports: [
        CommonModule,
        StatisticsRoutingModule
    ]
})
export class StatisticsModule {
}
