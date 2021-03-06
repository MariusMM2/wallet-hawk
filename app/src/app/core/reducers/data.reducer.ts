import {tassign} from 'tassign';
import {TypeGuards} from '../actions/data.actions';
import {DataState} from '../core.store';
import {BudgetItem} from '../models';
import {Creator} from '../types/creator';


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
export function dataReducer(state: DataState = INITIAL_STATE, action): DataState {
    if (TypeGuards.isInitializeData(action)) {
        return tassign(state, {
            categoryList: action.payload.categoryList,
            galleryList: action.payload.galleryList,
            receiptList: action.payload.receiptList,
            budgetItemList: action.payload.budgetItemList,
            recurrenceList: action.payload.recurrenceList,
            user: action.payload.user
        });
    } else if (TypeGuards.isClearData(action)) {
        return tassign(state, INITIAL_STATE);
    } else if (TypeGuards.isUpsertBudgetItem(action)) {
        let budgetItems = getBudgetItemsForCreator(state, action.payload.creator);

        if (action.payload.isFresh) {
            budgetItems.push(action.payload.budgetItem);
        } else {
            budgetItems = budgetItems.map(budgetItem => {
                if (budgetItem.id === action.payload.budgetItem.id) {
                    return action.payload.budgetItem;
                }

                return budgetItem;
            });
        }

        return replaceBudgetItemsOfCreator(state, budgetItems, action.payload.creator);
    } else if (TypeGuards.isDeleteBudgetItem(action)) {
        let budgetItems = getBudgetItemsForCreator(state, action.payload.creator);

        budgetItems = budgetItems.filter(budgetItem => budgetItem.id !== action.payload.id);

        return replaceBudgetItemsOfCreator(state, budgetItems, action.payload.creator);
    } else if (TypeGuards.isUpsertGallery(action)) {
        let galleryList = [...state.galleryList];

        if (action.payload.isFresh) {
            galleryList.push(action.payload.gallery);
        } else {
            galleryList = galleryList.map(gallery => {
                if (gallery.id === action.payload.gallery.id) {
                    return action.payload.gallery;
                }

                return gallery;
            });

        }

        return tassign(state, {
            galleryList
        });
    } else if (TypeGuards.isDeleteGallery(action)) {
        let galleryList = [...state.galleryList];

        galleryList = galleryList.filter(gallery => gallery.id !== action.payload);

        return tassign(state, {
            galleryList
        });
    } else if (TypeGuards.isUpsertReceipt(action)) {
        let receiptList = [...state.receiptList];

        if (action.payload.isFresh) {
            receiptList.push(action.payload.receipt);
        } else {
            receiptList = receiptList.map(receipt => {
                if (receipt.id === action.payload.receipt.id) {
                    return action.payload.receipt;
                }

                return receipt;
            });
        }

        return tassign(state, {
            receiptList
        });
    } else if (TypeGuards.isDeleteReceipt(action)) {
        let receiptList = [...state.receiptList];

        receiptList = receiptList.filter(receipt => receipt.id !== action.payload);

        return tassign(state, {
            receiptList
        });
    }

    return state;
}

function getBudgetItemsForCreator(state: DataState, creator: Creator): Array<BudgetItem> {
    if (creator === 'user') {
        return [...state.user.budgetItemList];
    }

    return [...state.budgetItemList];
}

function replaceBudgetItemsOfCreator(state: DataState, budgetItems: Array<BudgetItem>, creator: Creator): DataState {
    if (creator === 'user') {
        return tassign(state, {
            user: {
                budgetItemList: budgetItems,
                goal: state.user.goal
            }
        });
    }

    return tassign(state, {
        budgetItemList: budgetItems,
    });
}
