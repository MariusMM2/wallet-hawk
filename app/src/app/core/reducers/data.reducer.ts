import {tassign} from 'tassign';
import {DataActions} from '../actions/data.actions';
import {DataState} from '../core.store';
import {AnyAction} from 'redux';

const INITIAL_STATE: DataState = {
    categoryList: null,
    galleryList: null,
    receiptList: null,
    budgetItemList: null,
    recurrenceList: null,
    user: {
        budgetItemList: null,
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
            console.log('initializing', action.payload);
            return tassign(state, {
                categoryList: action.payload.categoryList,
                galleryList: action.payload.galleryList,
                receiptList: action.payload.receiptList,
                budgetItemList: action.payload.budgetItemList,
                recurrenceList: action.payload.recurrenceList,
                user: action.payload.user
            });
        case DataActions.CLEAR_DATA:
            return tassign(state, INITIAL_STATE);
        default:
            return state;
    }

}
