import {Injectable} from '@angular/core';
import {CoreState} from '../core.store';
import {ObservableStore} from '../../shared/utilities/observable-store';
import {AuthService} from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthActions {
    constructor(
        private redux: ObservableStore<CoreState>,
        private service: AuthService) {
    }

    static SET = 'Auth.SET';

    /**
     * TODO implement
     * Attempts to log the user using the provided
     * email and password.
     * @param email
     * @param password
     * @returns promised boolean on operation success/failure
     */
    async attemptLogin(email, password): Promise<boolean> {
        const user = await this.service.login(email, password);
        this.redux.dispatch({
            type: AuthActions.SET,
            payload: user
        });

        return;
    }

    /**
     * TODO implement
     * Logs the user out.
     */
    async logout(): Promise<void> {
        await this.service.logout();
        this.redux.dispatch({
            type: AuthActions.SET,
            payload: null
        });
    }

    /**
     * TODO implement
     * Attempts to register the user using the provided
     * email and password. Afterwards the user will be logged in.
     * @param email
     * @param password
     * @returns promised boolean on operation success/failure
     */
    async attemptRegister(email: string, password: string): Promise<boolean> {
        await this.service.register(email, password);
        return await this.attemptLogin(email, password);
    }
}
