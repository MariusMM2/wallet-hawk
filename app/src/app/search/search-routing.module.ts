import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from './search.component';

const routes: Routes = [
    {path: '', component: SearchComponent}
];

/**
 * Angular Module that holds navigation routes related to customisable searching.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchRoutingModule {
}
