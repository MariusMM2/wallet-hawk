import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() color: 'primary' | 'accent' | 'warn' = 'accent';
    @Input() submit: boolean = false;

    @Output() onclick = new EventEmitter<void>();
}
