import {Component, OnInit} from '@angular/core';
import {isLoginForm, LoginForm} from './types/loginForm';
import {RegisterForm} from './types/registerForm';
import {AuthActions} from '../core/actions/auth.actions';
import {ObservableStore} from '../shared/utilities/observable-store';
import {CoreState} from '../core/core.store';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-authenticate',
    templateUrl: './authenticate.component.html',
    styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {
    authMethod: 'login' | 'register' = 'login';

    submitErrors$: Observable<Array<String>>;

    constructor(
        private actions: AuthActions,
        private store: ObservableStore<CoreState>) {
    }

    ngOnInit(): void {
        this.submitErrors$ = this.store.select(state => state.auth.errors);
    }

    submitForm(authForm: LoginForm | RegisterForm) {
        console.log(authForm);
        if (isLoginForm(authForm)) {
            this.actions.attemptLogin(authForm);
        } else {
            this.actions.attemptRegister(authForm);
        }
    }

    toggleAuthMethod() {
        this.authMethod = this.authMethod === 'login' ? 'register' : 'login';
    }

    get isLoginMethod() {
        return this.authMethod === 'login';
    }

    get isRegisterMethod() {
        return this.authMethod === 'register';
    }
}
