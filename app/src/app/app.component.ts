import {Component, OnInit} from '@angular/core';
import {AuthService} from './core/services/auth.service';

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

    constructor(private auth: AuthService) {
    }

    ngOnInit() {
        this.auth.subscribeLoggedIn(isLoggedIn => {
            return this.sidebarOpen = this.sidebarEnabled = isLoggedIn;
        });
    }

    onSidebarToggle() {
        this.sidebarOpen = !this.sidebarOpen;
    }
}
