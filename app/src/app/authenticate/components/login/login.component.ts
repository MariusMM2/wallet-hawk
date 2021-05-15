import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @Output('switch') switchEvent = new EventEmitter<void>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onRegisterClick(): void {
        this.switchEvent.emit();
    }
}
