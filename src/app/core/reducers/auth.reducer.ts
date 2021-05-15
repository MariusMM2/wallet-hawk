import {tassign} from 'tassign';
import {AuthActions} from '../actions/auth.actions';
import {AuthState} from '../core.store';

const INITIAL_STATE: AuthState = {
    user: null
};

export function authReducer(state: AuthState = INITIAL_STATE, action: any) {
    switch (action.type) {
        case AuthActions.SET:
            return tassign(state, {user: action.payload});
        default:
            return state;
    }
}
