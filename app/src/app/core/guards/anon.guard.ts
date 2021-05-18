import {Injectable} from '@angular/core';
import {CanActivate, UrlTree} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {RouterService} from '../services/router.service';

/**
 * Prevents the user from visiting routes that
 * require anonymity (lack of authentication).
 */
@Injectable({
    providedIn: 'root'
})
export class AnonGuard implements CanActivate {
    constructor(private authService: AuthService, private routerService: RouterService) {
    }

    async canActivate(): Promise<boolean | UrlTree> {
        const authenticated = await this.authService.isLoggedIn();

        if (authenticated) {
            console.log('anonGuard denied');
            return this.routerService.homeUrl;
        }

        console.log('anonGuard approved');
        return true;
    }
}
