import {Injectable} from '@angular/core';
import {CoreState} from '../core.store';
import {ObservableStore} from '../../shared/utilities/observable-store';
import {AuthService} from '../services/auth.service';
import {LoginForm} from '../../authenticate/types/loginForm';
import {RegisterForm} from '../../authenticate/types/registerForm';

@Injectable({providedIn: 'root'})
export class AuthActions {
    constructor(
        private redux: ObservableStore<CoreState>,
        private service: AuthService) {
    }

    static SET_USER = 'Auth.SET_USER';
    static SET_ERRORS = 'Auth.SET_ERRORS';

    /**
     * TODO implement
     * Attempts to log the user using the provided
     * email and password.
     * @param {LoginForm} loginForm
     * @returns promised boolean on operation success/failure
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
            // this.redux.dispatch({
            //     type: AuthActions.SET_ERRORS,
            //     payload: errors
            // })
        }
    }

    /**
     * TODO implement
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
     * TODO implement
     * Attempts to register the user using the provided
     * email and password. Afterwards the user will be logged in.
     * @param {RegisterForm} registerForm
     * @returns promised boolean on operation success/failure
     */
    async attemptRegister(registerForm: RegisterForm): Promise<void> {
        await this.service.register(registerForm);
        return await this.attemptLogin(registerForm);
    }
}
