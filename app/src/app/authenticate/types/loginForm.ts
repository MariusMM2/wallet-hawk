import {RegisterForm} from './registerForm';

export interface LoginForm {
    email: string;
    password: string;
}

export function isLoginForm(form: LoginForm | RegisterForm): form is LoginForm {
    return (form as RegisterForm).confirmPassword === undefined;
}
