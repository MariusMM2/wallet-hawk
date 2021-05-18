import {Injectable} from '@angular/core';
import {Router, UrlTree} from '@angular/router';

/**
 * Angular Service that is responsible for managing
 * router navigation.
 */
@Injectable({
    providedIn: 'root'
})
export class RouterService {

    static readonly HOME = 'home';
    static readonly LOGIN = 'login';

    public readonly homeUrl: UrlTree;
    public readonly loginUrl: UrlTree;

    constructor(private router: Router) {
        this.homeUrl = router.parseUrl(RouterService.HOME);
        this.loginUrl = router.parseUrl(RouterService.LOGIN);
    }

    /**
     * Navigates the router to the home page.
     */
    async home(): Promise<void> {
        await this.router.navigateByUrl(this.homeUrl);
    }

    /**
     * Navigates the router to the login page.
     */
    async login(): Promise<void> {
        await this.router.navigateByUrl(this.loginUrl);
    }
}
