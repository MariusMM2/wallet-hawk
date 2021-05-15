import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticateRoutingModule} from './authenticate-routing.module';
import {AuthenticateComponent} from './authenticate.component';
import {LoginService} from './services/login.service';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {SharedModule} from '../shared/shared.module';


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
    ],
    providers: [
        LoginService
    ]
})
export class AuthenticateModule {
}
