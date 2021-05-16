import {Injectable} from '@angular/core';
import {ObservableStore} from '../../shared/utilities/observable-store';
import {CoreState} from '../core.store';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {LoginForm} from '../../authenticate/types/loginForm';
import {RegisterForm} from '../../authenticate/types/registerForm';
import {API_BASE} from '../../shared/utilities/backend-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private redux: ObservableStore<CoreState>,
        private http: HttpClient) {
    }

    /**
     * TODO implement
     * Sends a server request to log a user using the provided
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
                throw [response.message];
            }
            throw {};
        }

        return new Promise<User>((resolve, reject) => {
            this.http.post(url, form)
                .subscribe(function(value) {
                        console.log(value);
                        resolve(value as User);
                    },
                    function(response) {
                        console.log(response);
                        reject(response);
                    });
        });
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
    async register(form: RegisterForm): Promise<boolean | string> {
        //httpclient stuff
        return;
    }

    async isLoggedIn(): Promise<boolean> {
        return this.redux.getState(state => state.auth).user !== null;
    }
}
