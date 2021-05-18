import {RegisterForm} from './registerForm';

/**
 * Interface for a Login form.
 */
export interface LoginForm {
    email: string;
    password: string;
}

/**
 * TypeScript Type Guard that decides whether an object is a LoginForm or a RegisterForm.
 * @param {LoginForm|RegisterForm} form
 */
export function isLoginForm(form: LoginForm | RegisterForm): form is LoginForm {
    return (form as RegisterForm).confirmPassword === undefined;
}
