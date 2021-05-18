import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginForm} from '../../types/loginForm';
import {emailMaximumLength, passwordMaximumLength, passwordMinimumLength} from '../../../app.config';

/**
 * Angular Component that handles the fields of a user login form.
 *
 * @input {boolean} isLoading Whether a request is currently ongoing
 * @output {LoginForm} formValidated The submitted form
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    readonly maxEmailLength = emailMaximumLength;
    readonly minPasswordLength = passwordMinimumLength;
    readonly maxPasswordLength = passwordMaximumLength;

    @Input() isLoading: boolean;

    @Output() formValidated = new EventEmitter<LoginForm>();

    authForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.authForm = this.formBuilder.group({
            email: ['asd1@asdf', [
                Validators.required,
                Validators.maxLength(emailMaximumLength),
                Validators.email
            ]],
            password: ['asd1@asdf', [
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
