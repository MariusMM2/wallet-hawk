import {Injectable} from '@angular/core';

/**
 * Copy pasted from https://edupala.com/angular-route-guard-auth-guard/
 * Double check
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isAuthenticate = false;

    login(user: string, password: string): boolean {
        if (user === 'admin' && password === 'admin') {
            this.isAuthenticate = true;
            return this.isAuthenticate;
        }
        this.isAuthenticate = false;
        return this.isAuthenticate;
    }

    checkAuthenticationAsPromise(): Promise<boolean> {
        return new Promise((resolve) => resolve(false));
    }
}
