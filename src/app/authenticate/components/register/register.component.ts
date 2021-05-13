import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'auth-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    @Output('switch') switchEvent = new EventEmitter<void>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onLoginClick(): void {
        this.switchEvent.emit();
    }
}
