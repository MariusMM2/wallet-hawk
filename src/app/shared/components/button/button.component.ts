import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
    @Output() click = new EventEmitter<void>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onClicked(): void {
        this.click.emit();
    }

}
