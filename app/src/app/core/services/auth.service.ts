import {Injectable} from '@angular/core';
import {StoreService} from './store.service';
import {User} from '../models';
import {LoginForm} from '../../authenticate/types/loginForm';
import {RegisterForm} from '../../authenticate/types/registerForm';
import {API_BASE} from '../../shared/constants';
import StringUtils from '../../shared/utilities/string.utils';
import {HttpService} from './http.service';
import {Unsubscribable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

/**
 * Angular Service responsible for communicating with the backend
 * in regards to user authentication.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private store: StoreService,
        private http: HttpService) {
    }

    /**
     * Sends a server request to login a user using the provided
     * credentials.
     * @param form
     */
    async login(form: LoginForm): Promise<User> {
        const url = `${API_BASE}/auth/login`;
        try {
            return await this.http.post<User>(url, form);
        } catch (response) {
            console.log(response);
            throw AuthService.handleGenericErrors(response);
        }
    }

    /**
     * Sends a server request to create a user account using the provided
     * credentials.
     * @param form
     */
    async register(form: RegisterForm): Promise<void> {
        const url = `${API_BASE}/auth/register`;
        try {
            await this.http.post<void>(url, form);
        } catch (response) {
            throw AuthService.handleGenericErrors(response);
        }
    }

    /**
     * Sends a server request to log the user out.
     */
    async logout(): Promise<void> {
        const url = `${API_BASE}/auth/logout`;
        try {
            await this.http.get(url);
        } catch (response) {
            console.log(response);
        }
    }

    /**
     * Sends a server request to retrieve the user for the current session, if any.
     */
    async isSessionLoggedIn(): Promise<User | boolean> {
        const url = `${API_BASE}/auth/authenticated-user`;
        let user;
        try {
            user = await this.http.get<User>(url);
        } catch (response) {
            if (response.status === 401) {
                return false;
            }

            console.log(response);
            throw AuthService.handleGenericErrors(response);
        }

        return user;
    }

    isLoggedIn(): boolean {
        return this.store.getState(state => state.auth).user !== null;
    }

    subscribeLoggedIn(next?: (value: boolean) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable {
        return this.store.select(state => state.auth.user)
            .pipe(map(user => user !== null))
            .subscribe(next, error, complete);
    }

    /**
     * Handles various standard error responses and throws a corresponding error message.
     * @param {HttpErrorResponse} response
     * @private
     */
    static handleGenericErrors(response: HttpErrorResponse): Array<string> {
        if (response.status === 0) {
            // Connection failed
            throw ['Unable to connect to the server. Please try again later.'];
        } else if (response.status === 403) {
            // Invalid credentials
            throw [response.error.error];
        } else if (response.status === 400) {
            // Input errors
            throw StringUtils.parseErrorArray(response.error.errors);
        }

        // Unhandled
        throw Error(`Unhandled exception for response: ${JSON.stringify(response)}`);
    }
}
