import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecurrenceComponent} from './recurrence.component';

const routes: Routes = [{path: '', component: RecurrenceComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecurrenceRoutingModule {
}
