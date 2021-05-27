import {Component, OnInit} from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {AuthActions} from './core/actions/auth.actions';
import {DataActions} from './core/actions/data.actions';

/**
 * Angular Component that manages the top-level elements in the application.
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    sidebarOpen = false;
    sidebarEnabled = false;

    constructor(
        private service: AuthService,
        private authActions: AuthActions,
        private dataActions: DataActions) {
    }

    async ngOnInit() {
        await this.authActions.setSessionUser();

        this.service.subscribeLoggedIn(isLoggedIn => {
            return this.sidebarOpen = this.sidebarEnabled = isLoggedIn;
        });
    }

    onSidebarToggle() {
        this.sidebarOpen = !this.sidebarOpen;
    }
}
