import {Injectable} from '@angular/core';
import {ObservableStore} from '../../shared/utilities/redux.utils';
import {CoreState} from '../core.store';
import {User} from '../models/user';
import {LoginForm} from '../../authenticate/types/loginForm';
import {RegisterForm} from '../../authenticate/types/registerForm';
import {API_BASE} from '../../shared/constants';
import StringUtils from '../../shared/utilities/string.utils';
import {HttpService} from './http.service';
import {Unsubscribable} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * Angular Service responsible for communicating with the backend
 * in regards to user authentication.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private redux: ObservableStore<CoreState>,
        private http: HttpService) {
    }

    /**
     * Sends a server request to login a user using the provided
     * credentials.
     * @param form
     */
    async login(form: LoginForm): Promise<User> {
        const url = `${API_BASE}/auth/login`;
        console.log(url);
        let user;
        try {
            user = await this.http.post<User>(url, form);
            console.log(user);
        } catch (response) {
            console.log(response);
            if (response.status === 403) {
                throw [response.error.error];
            } else if (response.status === 400) {
                throw StringUtils.parseErrorArray(response.error.errors);
            }
            throw Error(`Unhandled exception for response: ${response.toString()}`);
        }

        return user;
    }

    /**
     * Sends a server request to create a user account using the provided
     * credentials.
     * @param form
     */
    async register(form: RegisterForm): Promise<void> {
        const url = `${API_BASE}/auth/register`;
        console.log(url);
        try {
            await this.http.post<void>(url, form);
        } catch (response) {
            console.log(response);
            if (response.status === 400) {
                throw StringUtils.parseErrorArray(response.error.errors);
            }
            throw Error(`Unhandled exception for response: ${JSON.stringify(response)}`);
        }
    }

    /**
     * Sends a server request to log the user out.
     */
    async logout(): Promise<void> {
        const url = `${API_BASE}/auth/logout`;
        console.log(url);
        try {
            await this.http.get(url);
        } catch (response) {
            console.log(response);
        }
    }

    async isSessionLoggedIn(): Promise<User | boolean> {
        const url = `${API_BASE}/auth/authenticated-user`;
        console.log(url);
        let user;
        try {
            user = await this.http.get<User>(url);
        } catch (response) {
            console.log(response);
            if (response.status === 401) {
                return false;
            }
            throw Error(`Unhandled exception for response: ${JSON.stringify(response)}`);
        }

        return user;
    }

    isLoggedIn(): boolean {
        return this.redux.getState(state => state.auth).user !== null;
    }

    subscribeLoggedIn(next?: (value: boolean) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable {
        return this.redux.select(state => state.auth.user)
            .pipe(map(user => user !== null))
            .subscribe(next, error, complete);
    }
}
