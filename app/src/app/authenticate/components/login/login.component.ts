import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginForm} from '../../types/loginForm';
import {passwordMaximumLength, passwordMinimumLength} from '../../../app.config';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    readonly passwordLength = passwordMinimumLength;

    @Output() formValidated = new EventEmitter<LoginForm>();

    authForm: FormGroup;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email
    ]);

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.authForm = this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(passwordMinimumLength),
                Validators.maxLength(passwordMaximumLength)
            ]],
        });
    }

    onSubmit(event: Event) {
        event.preventDefault();
        if (this.authForm.valid) {
            this.formValidated.emit(this.authForm.value);
        }
    }
}
