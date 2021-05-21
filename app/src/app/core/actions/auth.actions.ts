import {Injectable} from '@angular/core';
import {CoreState} from '../core.store';
import {ObservableStore} from '../../shared/utilities/redux.utils';
import {AuthService} from '../services/auth.service';
import {LoginForm} from '../../authenticate/types/loginForm';
import {RegisterForm} from '../../authenticate/types/registerForm';

@Injectable({providedIn: 'root'})
export class AuthActions {
    constructor(
        private redux: ObservableStore<CoreState>,
        private service: AuthService) {
    }

    static readonly SET_USER = 'Auth.SET_USER';
    static readonly SET_ERRORS = 'Auth.SET_ERRORS';

    /**
     * Attempts to log the user using the provided
     * email and password.
     * @param {LoginForm} loginForm
     */
    async attemptLogin(loginForm: LoginForm): Promise<void> {
        try {
            const user = await this.service.login(loginForm);

            this.redux.dispatch({
                type: AuthActions.SET_USER,
                payload: user
            });
        } catch (errors) {
            console.log(errors);
            this.redux.dispatch({
                type: AuthActions.SET_ERRORS,
                payload: errors
            });
        }
    }

    /**
     * Logs the user out.
     */
    async logout(): Promise<void> {
        await this.service.logout();
        this.redux.dispatch({
            type: AuthActions.SET_USER,
            payload: null
        });
    }

    /**
     * Attempts to register the user using the provided
     * email and password. Afterwards the user will be logged in.
     * @param {RegisterForm} registerForm
     */
    async attemptRegister(registerForm: RegisterForm): Promise<void> {
        try {
            await this.service.register(registerForm);

            await this.attemptLogin(registerForm);
        } catch (errors) {
            console.log(errors);
            this.redux.dispatch({
                type: AuthActions.SET_ERRORS,
                payload: errors
            });
        }
    }

    /**
     * Clears the authentication errors.
     */
    clearErrors(): void {
        this.redux.dispatch({
            type: AuthActions.SET_ERRORS,
            payload: []
        });
    }
}
