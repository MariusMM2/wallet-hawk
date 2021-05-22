import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

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
export class HamburgerMenuComponent implements OnInit, OnChanges {
    @Input() private active: boolean;
    @Input() sidebarEnabled: boolean;
    @Output() activeChange = new EventEmitter<boolean>();

    private svgElement: SVGElement;

    ngOnInit(): void {
        this.svgElement = document.querySelector('svg');
    }

    ngOnChanges(changes: SimpleChanges): void {
        const active = changes['active'];
        if (active && active.previousValue !== active.currentValue) {
            this.svgElement?.classList.toggle('active');
        }
    }

    onClick() {
        this.activeChange.emit(!this.active);
    }
}
