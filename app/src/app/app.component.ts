import {Component, OnInit} from '@angular/core';

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
