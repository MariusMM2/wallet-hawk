import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecurrenceComponent} from './recurrence.component';

const routes: Routes = [
    {path: '', component: RecurrenceComponent}
];

/**
 * Angular Module that holds navigation routes related to recurrent budget items.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecurrenceRoutingModule {
}
