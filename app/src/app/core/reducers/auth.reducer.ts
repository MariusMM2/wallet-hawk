import {tassign} from 'tassign';
import {AuthActions} from '../actions/auth.actions';
import {AuthState} from '../core.store';
import {AnyAction} from 'redux';

const INITIAL_STATE: AuthState = {
    user: null,
    errors: []
};

/**
 * Redux Reducer that manages the part of the state responsible
 * for user authentication.
 */
export function authReducer(state: AuthState = INITIAL_STATE, action: AnyAction) {
    switch (action.type) {
        case AuthActions.SET_USER:
            return tassign(state, {
                user: action.payload,
                errors: []
            });
        case AuthActions.SET_ERRORS:
            return tassign(state, {
                user: null,
                errors: action.payload
            });
        default:
            return state;
    }
}
