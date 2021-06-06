import {Component, OnInit} from '@angular/core';
import {RouterService} from '../../services/router.service';
import {UrlTree} from '@angular/router';
import {AuthActionsService} from '../../services/auth-actions.service';

/**
 * Angular Component that manages the application sidebar.
 */
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    activeUrl: UrlTree = this.router.dashboardUrl;

    constructor(
        public router: RouterService,
        private actions: AuthActionsService) {
    }

    ngOnInit() {
        const endpoints = this.router.routes.map(route => route.url);
        this.router.navigationEndEvents().subscribe(navigationEndEvent => {
            const endpointUrlTree = endpoints.find(urlTree => {
                return urlTree.toString() === navigationEndEvent.urlAfterRedirects;
            });

            if (endpointUrlTree) {
                this.activeUrl = endpointUrlTree;
            }
        });
    }

    async onClick(nextUrl: UrlTree) {
        if (nextUrl === this.router.logoutUrl) {
            return await this.actions.logout();
        }

        if (this.activeUrl === nextUrl) {
            return;
        }

        this.activeUrl = nextUrl;
        await this.router.navigate(nextUrl);
    }

    /**
     * Function used to determine when an item in the *ngFor needs updating.
     * Using the default function breaks the ripple effect on the sidebar items,
     * for unknown reasons.
     */
    public routesTrackBy(_index: number, route: any) {
        if (!route) {
            return null;
        }

        return route.label;
    }
}
