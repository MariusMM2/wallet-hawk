import {tassign} from 'tassign';
import {AuthActions} from '../actions/auth.actions';
import {AuthState} from '../core.store';

const INITIAL_STATE: AuthState = {
    user: null,
    errors: []
};

export function authReducer(state: AuthState = INITIAL_STATE, action: any) {
    switch (action.type) {
        case AuthActions.SET_USER:
            return tassign(state, {user: action.payload});
        case AuthActions.SET_ERRORS:
            return tassign(state, {errors: action.payload});
        default:
            return state;
    }
}
