import {LoginForm} from './loginForm';

export interface RegisterForm extends LoginForm {
    firstName?: string;
    lastName?: string;
    confirmPassword: string;
}
