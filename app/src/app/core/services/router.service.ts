import {Injectable} from '@angular/core';
import {NavigationBehaviorOptions, Router, UrlTree} from '@angular/router';
import {AuthActions} from '../actions/auth.actions';

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
    static readonly DASHBOARD = 'dashboard';
    static readonly SEARCH = 'search';
    static readonly GALLERY = 'gallery';
    static readonly RECURRENCES = 'recurrence';
    static readonly STATISTICS = 'statistics';
    static readonly SETTINGS = 'settings';
    static readonly LOGOUT = 'logout';

    public readonly homeUrl: UrlTree;
    public readonly loginUrl: UrlTree;
    public readonly dashboardUrl: UrlTree;
    public readonly searchUrl: UrlTree;
    public readonly galleryUrl: UrlTree;
    public readonly recurrencesUrl: UrlTree;
    public readonly statisticsUrl: UrlTree;
    public readonly settingsUrl: UrlTree;
    public readonly logoutUrl: UrlTree;

    constructor(private router: Router, private actions: AuthActions) {
        this.homeUrl = router.parseUrl(RouterService.HOME);
        this.loginUrl = router.parseUrl(RouterService.LOGIN);

        this.dashboardUrl = router.parseUrl(`${RouterService.HOME}/${RouterService.DASHBOARD}`);
        this.searchUrl = router.parseUrl(`${RouterService.HOME}/${RouterService.SEARCH}`);
        this.galleryUrl = router.parseUrl(`${RouterService.HOME}/${RouterService.GALLERY}`);
        this.recurrencesUrl = router.parseUrl(`${RouterService.HOME}/${RouterService.RECURRENCES}`);
        this.statisticsUrl = router.parseUrl(`${RouterService.HOME}/${RouterService.STATISTICS}`);
        this.settingsUrl = router.parseUrl(`${RouterService.HOME}/${RouterService.SETTINGS}`);
        this.logoutUrl = router.parseUrl(`${RouterService.HOME}/${RouterService.LOGOUT}`);
    }

    /**
     * Returns an object containing the sidebar routes with their label, icon and url.
     */
    get routes() {
        return [
            {
                label: 'Dashboard',
                url: this.dashboardUrl,
                icon: 'dashboard'
            },
            {
                label: 'Search',
                url: this.searchUrl,
                icon: 'search'
            },
            {
                label: 'Gallery',
                url: this.galleryUrl,
                icon: 'collections'
            },
            {
                label: 'Recurrences',
                url: this.recurrencesUrl,
                icon: 'payments'
            },
            {
                label: 'Statistics',
                url: this.statisticsUrl,
                icon: 'bar_chart'
            },
            {
                label: 'Settings',
                url: this.settingsUrl,
                icon: 'settings'
            },
            {
                label: 'Logout',
                url: this.logoutUrl,
                icon: 'logout'
            }];
    }

    /**
     * Navigates the router to the given url.
     *
     * @param {string | UrlTree} url
     * @param {NavigationBehaviorOptions} extras?
     */
    async navigate(url: string | UrlTree, extras?: NavigationBehaviorOptions): Promise<boolean> {
        return await this.router.navigateByUrl(url, extras);
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

    /**
     * Navigates the router to the search page.
     */
    async search(): Promise<void> {
        await this.router.navigateByUrl(this.searchUrl);
    }

    /**
     * Navigates the router to the gallery page.
     */
    async gallery(): Promise<void> {
        await this.router.navigateByUrl(this.galleryUrl);
    }

    /**
     * Navigates the router to the recurrences page.
     */
    async recurrences(): Promise<void> {
        await this.router.navigateByUrl(this.recurrencesUrl);
    }

    /**
     * Navigates the router to the statistics page.
     */
    async statistics(): Promise<void> {
        await this.router.navigateByUrl(this.statisticsUrl);
    }

    /**
     * Navigates the router to the settings page.
     */
    async settings(): Promise<void> {
        await this.router.navigateByUrl(this.settingsUrl);
    }

    /**
     * Logs the user out and navigates to the login page.
     */
    async logout(): Promise<void> {
        await this.actions.logout();
        await this.login();
    }
}
