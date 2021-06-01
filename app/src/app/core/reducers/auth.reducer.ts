import {tassign} from 'tassign';
import {AuthState} from '../core.store';
import {TypeGuards} from '../actions/auth.actions';

const INITIAL_STATE: AuthState = {
    user: null,
    errors: []
};

/**
 * Redux Reducer that manages the part of the state responsible
 * for user authentication.
 */
export function authReducer(state: AuthState = INITIAL_STATE, action) {
    if (TypeGuards.isSetUser(action)) {
        return tassign(state, {
            user: action.payload,
            errors: []
        });
    } else if (TypeGuards.isSetErrors(action)) {
        return tassign(state, {
            user: null,
            errors: action.payload
        });
    } else {
        return state;
    }
}
