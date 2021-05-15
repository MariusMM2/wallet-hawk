import {tassign} from 'tassign';
import {DataActions} from '../actions/data.actions';
import {DataState} from '../core.store';

const INITIAL_STATE: DataState = {
    categoryList: null,
    galleryList: null,
    receipts: null,
    budgetItemList: null,
    recurrenceList: null
};

export function dataReducer(state: DataState = INITIAL_STATE, action: any) {
    switch (action.type) {
        case DataActions.INITIALIZE_DATA:
            return tassign(state, {
                categoryList: action.payload.categoryList,
                galleryList: action.payload.galleryList,
                receipts: action.payload.receipts,
                budgetItemList: action.payload.budgetItemList,
                recurrenceList: action.payload.recurrenceList
            });
        default:
            return state;
    }

}
