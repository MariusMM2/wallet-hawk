import {Action} from 'redux';
import {User} from '../models';

export enum AuthActions {
    SET_USER = 'Auth.SET_USER',
    SET_ERRORS = 'Auth.SET_ERRORS'
}

export class TypeGuards {
    static isSetUser(action: Action): action is ActionSetUser {
        return action.type === AuthActions.SET_USER;
    }

    static isSetErrors(action: Action): action is ActionSetErrors {
        return action.type === AuthActions.SET_ERRORS;
    }
}

interface ActionSetUser extends Action {
    payload: User;
}

interface ActionSetErrors extends Action {
    payload: Array<String>;
}

