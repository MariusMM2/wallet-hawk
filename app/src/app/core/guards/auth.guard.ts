import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';

/**
 * Copy pasted from https://edupala.com/angular-route-guard-auth-guard/
 * Double check
 */
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        console.log('AuthWithRedirectGuard.canActivate');
        const authenticated = await this.authService.isLoggedIn();
        console.log('canActivate await value: ' + authenticated);

        if (!authenticated) {
            await this.router.navigate(['login']);
        }
        return false;
    }
}
