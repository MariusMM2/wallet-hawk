import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-hamburger-menu',
    templateUrl: './hamburger-menu.component.html',
    styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent implements OnInit {
    @Input() active: boolean;
    @Output() activeChange = new EventEmitter<boolean>();

    private svgElement: any;

    ngOnInit(): void {
        this.svgElement = document.querySelector('.ham.ham2');
        if (this.active) {
            this.svgElement.classList.add('active');
        }
    }

    onClick() {
        this.activeChange.emit(!this.active);
    }
}
