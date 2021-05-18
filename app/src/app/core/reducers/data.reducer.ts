import {tassign} from 'tassign';
import {DataActions} from '../actions/data.actions';
import {DataState} from '../core.store';
import {AnyAction} from 'redux';

const INITIAL_STATE: DataState = {
    categoryList: null,
    galleryList: null,
    receipts: null,
    budgetItemList: null,
    recurrenceList: null,
    user: {
        budgetItems: null,
        goal: null
    }
};

/**
 * Redux Reducer that manages the part of the state responsible
 * for application data.
 */
export function dataReducer(state: DataState = INITIAL_STATE, action: AnyAction) {
    switch (action.type) {
        case DataActions.INITIALIZE_DATA:
            return tassign(state, {
                categoryList: action.payload.categoryList,
                galleryList: action.payload.galleryList,
                receipts: action.payload.receipts,
                budgetItemList: action.payload.budgetItemList,
                recurrenceList: action.payload.recurrenceList,
                user: action.payload.user
            });
        default:
            return state;
    }

}
