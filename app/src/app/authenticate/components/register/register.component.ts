import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterForm} from '../../types/registerForm';
import {
    emailMaximumLength,
    emailMinimumLength,
    emailRegExp,
    nameMaximumLength,
    passwordMaximumLength,
    passwordMinimumLength,
    passwordRegExp
} from '../../../app.config';
import {emailAvailable, mustMatch} from '../../../shared/utilities/validators.utils';

/**
 * Angular Component that handles the fields of a user register form.
 *
 * @input {boolean} isLoading Whether a request is currently ongoing
 * @output {RegisterForm} formValidated The submitted form
 */
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    readonly maxNameLength = nameMaximumLength;
    readonly minEmailLength = emailMinimumLength;
    readonly maxEmailLength = emailMaximumLength;
    readonly minPasswordLength = passwordMinimumLength;
    readonly maxPasswordLength = passwordMaximumLength;

    @Input() isLoading: boolean;

    @Output() formValidated = new EventEmitter<RegisterForm>();

    authForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.authForm = this.formBuilder.group({
            firstName: ['', [
                Validators.maxLength(nameMaximumLength)
            ]],
            lastName: ['', [
                Validators.maxLength(nameMaximumLength)
            ]],
            email: ['', [
                Validators.required,
                Validators.maxLength(emailMaximumLength),
                Validators.pattern(emailRegExp)
            ], [
                emailAvailable // async validators must be the third parameter of a form control
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(passwordMinimumLength),
                Validators.maxLength(passwordMaximumLength),
                Validators.pattern(passwordRegExp)
            ]],
            confirmPassword: ['', [
                Validators.required
            ]]
        }, {
            validators: mustMatch('password', 'confirmPassword')
        });
    }

    onSubmit(event: Event) {
        event.preventDefault();
        if (this.authForm.valid) {
            this.formValidated.emit(this.authForm.value);
        }
    }
}
