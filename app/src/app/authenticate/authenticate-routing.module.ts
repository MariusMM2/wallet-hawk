import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticateComponent} from './authenticate.component';

const routes: Routes = [
    {path: '', component: AuthenticateComponent}
];

/**
 * Angular Module that holds navigation routes related to authentication.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticateRoutingModule {
}
