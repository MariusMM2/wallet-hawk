import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-authenticate',
    templateUrl: './authenticate.component.html',
    styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {
    authMethod: 'login' | 'register' = 'login';

    constructor() {
    }

    ngOnInit(): void {
    }

    switch(newAuthMethod: 'login' | 'register'): void {
        this.authMethod = newAuthMethod;
    }
}
