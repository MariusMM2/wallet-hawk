import {Component, OnInit} from '@angular/core';

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

    constructor() {
    }

    ngOnInit() {
    }

    onSidebarToggle() {
        this.sidebarOpen = !this.sidebarOpen;
    }
}
