import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecurrenceRoutingModule} from './recurrence-routing.module';
import {RecurrenceComponent} from './recurrence.component';

/**
 * Angular Module that contains features related to recurrent budget items.
 */
@NgModule({
    declarations: [
        RecurrenceComponent
    ],
    imports: [
        CommonModule,
        RecurrenceRoutingModule
    ]
})
export class RecurrenceModule {
}
