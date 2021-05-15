import {Injectable} from '@angular/core';
import {ObservableStore} from '../../shared/utilities/observable-store';
import {CoreState} from '../core.store';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private redux: ObservableStore<CoreState>,
        private httpClient: HttpClient) {
    }

    /**
     * TODO implement
     * Sends a server request to log a user using the provided
     * credentials.
     * @param username
     * @param password
     */
    async login(username: string, password: string): Promise<User | boolean> {
        return;
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
     * @param username
     * @param password
     */
    async register(username: string, password: string): Promise<boolean> {
        //httpclient stuff
        return;
    }

    async isLoggedIn(): Promise<boolean> {
        return this.redux.getState(state => state.auth).user !== null;
    }
}
