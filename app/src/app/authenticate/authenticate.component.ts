import {Component, OnInit} from '@angular/core';
import {isLoginForm, LoginForm} from './types/loginForm';
import {RegisterForm} from './types/registerForm';
import {AuthActionsService} from '../core/services/auth-actions.service';
import {StoreService} from '../core/services/store.service';
import {Observable} from 'rxjs';
import {AuthService} from '../core/services/auth.service';

/**
 * Angular Component that handles login and registration of a user.
 */
@Component({
    selector: 'app-authenticate',
    templateUrl: './authenticate.component.html',
    styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {
    authMethod: 'login' | 'register' = 'login';

    submitErrors$: Observable<Array<String>>;

    isLoading: boolean = false;

    constructor(
        private actions: AuthActionsService,
        private service: AuthService,
        private store: StoreService) {
    }

    ngOnInit(): void {
        this.submitErrors$ = this.store.select(state => state.auth.errors);
    }

    async submitForm(authForm: LoginForm | RegisterForm) {
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;
        console.log(authForm);
        if (isLoginForm(authForm)) {
            await this.actions.attemptLogin(authForm);
        } else {
            await this.actions.attemptRegister(authForm);
        }

        this.isLoading = false;
    }


    toggleAuthMethod() {
        if (this.isLoading) {
            return;
        }

        this.authMethod = this.authMethod === 'login' ? 'register' : 'login';

        this.actions.clearErrors();
    }

    get isLoginMethod() {
        return this.authMethod === 'login';
    }

    get isRegisterMethod() {
        return this.authMethod === 'register';
    }
}
