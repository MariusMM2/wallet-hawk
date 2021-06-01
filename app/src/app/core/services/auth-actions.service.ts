import {Injectable} from '@angular/core';
import {StoreService} from './store.service';
import {AuthService} from './auth.service';
import {LoginForm} from '../../authenticate/types/loginForm';
import {RegisterForm} from '../../authenticate/types/registerForm';
import {AuthActions} from '../actions/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthActionsService {
    constructor(
        private store: StoreService,
        private service: AuthService) {
    }

    /**
     * Attempts to log the user using the provided
     * email and password.
     * @param {LoginForm} loginForm
     */
    async attemptLogin(loginForm: LoginForm): Promise<void> {
        let user;
        try {
            user = await this.service.login(loginForm);
        } catch (errors) {
            console.log(errors);
            this.store.dispatch({
                type: AuthActions.SET_ERRORS,
                payload: errors
            });
            return;
        }

        this.store.dispatch({
            type: AuthActions.SET_USER,
            payload: user
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
            this.store.dispatch({
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
        this.store.dispatch({
            type: AuthActions.SET_USER,
            payload: null
        });
    }

    async setSessionUser(): Promise<boolean> {
        if (this.service.isLoggedIn()) {
            return true;
        }

        let user;
        try {
            user = await this.service.isSessionLoggedIn();
        } catch (errors) {
            console.log(errors);
        }

        if (user) {
            this.store.dispatch({
                type: AuthActions.SET_USER,
                payload: user
            });
            return true;
        }

        return false;
    }

    /**
     * Clears the authentication errors.
     */
    clearErrors(): void {
        this.store.dispatch({
            type: AuthActions.SET_ERRORS,
            payload: []
        });
    }
}
