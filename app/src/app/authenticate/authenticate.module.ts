import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthenticateRoutingModule} from './authenticate-routing.module';
import {AuthenticateComponent} from './authenticate.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {SharedModule} from '../shared/shared.module';

/**
 * Angular Module that contains features related to user authentication.
 */
@NgModule({
    declarations: [
        AuthenticateComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        AuthenticateRoutingModule,
        SharedModule
    ]
})
export class AuthenticateModule {
}
