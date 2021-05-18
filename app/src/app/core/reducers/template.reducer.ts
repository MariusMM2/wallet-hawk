import {CoreState} from '../core.store';
import {tassign} from 'tassign';
import {TemplateActions} from '../actions/template.actions';

// noinspection JSUnusedGlobalSymbols
/**
 * TODO remove template when done implementing
 * Template Redux Reducer that does nothing.
 */
export function templateReducer(state: CoreState, action: any) {
    switch (action.type) {
        case TemplateActions.ACTION_TYPE:
            return tassign(state, action.payload);
        default:
            return state;
    }
}
