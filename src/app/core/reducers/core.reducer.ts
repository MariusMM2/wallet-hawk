import {CoreState} from '../core.store';
import {tassign} from 'tassign';
import {CoreActions} from '../actions/core.actions';

const INITIAL_STATE: CoreState = {
    user: null,
    categoryList: [],
    galleryList: [],
    receipts: [],
    budgetItemList: [],
    recurrenceList: []
};

export function coreReducer(state: CoreState = INITIAL_STATE, action: any) {
    switch (action.type) {
        /**
         * TODO remove when implemented
         */
        case CoreActions.ACTION_TYPE:
            return tassign(state, action.payload);
        default:
            return state;
    }
}
