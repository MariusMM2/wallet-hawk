import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterForm} from '../../types/registerForm';
import {passwordMaximumLength, passwordMinimumLength, passwordRegExp} from '../../../app.config';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    readonly passwordLength = passwordMinimumLength;

    @Output() formValidated = new EventEmitter<RegisterForm>();

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
                Validators.email]],
            password: ['', [
                Validators.required,
                Validators.minLength(passwordMinimumLength),
                Validators.pattern(passwordRegExp),
                Validators.maxLength(passwordMaximumLength)
            ]],
            confirmPassword: ['', [Validators.required]],
        });
    }

    onSubmit(event: Event) {
        event.preventDefault();
        if (this.authForm.valid) {
            this.formValidated.emit(this.authForm.value);
        }
    }
}
