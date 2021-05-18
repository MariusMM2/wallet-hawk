import {Injectable} from '@angular/core';
import {ObservableStore} from '../../shared/utilities/redux.utils';
import {CoreState} from '../core.store';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {LoginForm} from '../../authenticate/types/loginForm';
import {RegisterForm} from '../../authenticate/types/registerForm';
import {API_BASE} from '../../shared/constants';
import {parseErrorArray} from '../../shared/utilities/string.utils';

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
        private http: HttpClient) {
    }

    /**
     * Sends a server request to login a user using the provided
     * credentials.
     * @param form
     */
    async login(form: LoginForm): Promise<User> {
        const url = `${API_BASE}/auth/login`;
        console.log(url);
        try {
            const user = await this.http.post<User>(url, form).toPromise();
            console.log(user);
            return user;
        } catch (response) {
            console.log(response);
            if (response.status === 403) {
                throw [response.error.error];
            } else if (response.status === 400) {
                throw parseErrorArray(response.error.errors);
            }
            throw Error(`Unhandled exception for response: ${response.toString()}`);
        }
    }

    /**
     * TODO implement
     * Sends a server request to log the user out. (or not)
     */
    async logout(): Promise<void> {
        return;
    }

    /**
     * TODO implement
     * Sends a server request to create a user account using the provided
     * credentials.
     * @param form
     */
    async register(form: RegisterForm): Promise<void> {
        const url = `${API_BASE}/auth/register`;
        console.log(url);
        try {
            await this.http.post<void>(url, form).toPromise();
        } catch (response) {
            console.log(response);
            if (response.status === 400) {
                throw parseErrorArray(response.error.errors);
            }
            throw Error(`Unhandled exception for response: ${JSON.stringify(response)}`);
        }
    }

    isLoggedIn(): boolean {
        return this.redux.getState(state => state.auth).user !== null;
    }
}
