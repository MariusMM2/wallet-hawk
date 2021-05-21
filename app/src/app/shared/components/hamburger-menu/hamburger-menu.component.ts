import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

/**
 * Angular Component that manages a toggle-like button stylized as a
 * 'hamburger menu'.
 *
 * @input {boolean} active Whether the button is currently activated.
 * @output {boolean} activeChange The new active state
 */
@Component({
    selector: 'app-hamburger-menu',
    templateUrl: './hamburger-menu.component.html',
    styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent implements OnInit {
    private _active: boolean;
    @Input()
    set active(value: boolean) {
        this.svgElement.classList.toggle('active');
        this._active = value;
    }

    @Input() sidebarEnabled: boolean;
    @Output() activeChange = new EventEmitter<boolean>();

    private svgElement: HTMLElement;

    ngOnInit(): void {
        this.svgElement = document.querySelector('.ham.ham2');
    }

    onClick() {
        this.activeChange.emit(!this._active);
    }
}
