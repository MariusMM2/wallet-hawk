import {CoreState} from '../core.store';
import {tassign} from 'tassign';
import {TemplateActions} from '../actions/template.actions';

export function templateReducer(state: CoreState, action: any) {
    /**
     * TODO remove template when done implementing
     */
    switch (action.type) {
        case TemplateActions.ACTION_TYPE:
            return tassign(state, action.payload);
        default:
            return state;
    }
}
