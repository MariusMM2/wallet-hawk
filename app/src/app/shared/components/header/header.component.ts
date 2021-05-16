import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    private _sidebarOpen: boolean;
    @Input()
    set sidebarOpen(value: boolean) {
        this._sidebarOpen = value;
        this.sidebarOpenChange.emit(value);
    }

    get sidebarOpen() {
        return this._sidebarOpen;
    }

    @Output()
    sidebarOpenChange = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit(): void {
    }
}
