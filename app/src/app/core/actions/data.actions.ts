import {Action} from 'redux';
import {DataState} from '../core.store';
import {Creator} from '../types/creator';
import {BudgetItem, Gallery, Receipt} from '../models';

export enum DataActions {
    INITIALIZE_DATA = 'Data.INITIALIZE_DATA',
    CLEAR_DATA = 'Data.CLEAR_DATA',
    UPSERT_BUDGET_ITEM = 'Data.UPSERT_BUDGET_ITEM',
    DELETE_BUDGET_ITEM = 'Data.DELETE_BUDGET_ITEM',
    UPSERT_GALLERY = 'Data. UPSERT_GALLERY',
    DELETE_GALLERY = 'Data.DELETE_GALLERY',
    UPSERT_RECEIPT = 'Data.UPDATE_RECEIPT',
    DELETE_RECEIPT = 'Data.DELETE_RECEIPT',
}

export class TypeGuards {
    static isInitializeData(action: Action): action is ActionInitializeData {
        return action.type === DataActions.INITIALIZE_DATA;
    }

    static isClearData(action: Action): action is ActionClearData {
        return action.type === DataActions.CLEAR_DATA;
    }

    static isUpsertBudgetItem(action: Action): action is ActionUpsertBudgetItem {
        return action.type === DataActions.UPSERT_BUDGET_ITEM;
    }

    static isDeleteBudgetItem(action: Action): action is ActionDeleteBudgetItem {
        return action.type === DataActions.DELETE_BUDGET_ITEM;
    }

    static isUpsertGallery(action: Action): action is ActionUpsertGallery {
        return action.type === DataActions.UPSERT_GALLERY;
    }

    static isDeleteGallery(action: Action): action is ActionDeleteGallery {
        return action.type === DataActions.DELETE_GALLERY;
    }

    static isUpsertReceipt(action: Action): action is ActionUpsertReceipt {
        return action.type === DataActions.UPSERT_RECEIPT;
    }

    static isDeleteReceipt(action: Action): action is ActionDeleteReceipt {
        return action.type === DataActions.DELETE_RECEIPT;
    }
}

interface ActionInitializeData extends Action {
    payload: DataState
}

interface ActionClearData extends Action {
}

interface ActionUpsertBudgetItem extends Action {
    payload: {
        creator: Creator,
        budgetItem: BudgetItem,
        isFresh: boolean
    }
}

interface ActionDeleteBudgetItem extends Action {
    payload: {
        creator: Creator,
        id: string
    }
}

interface ActionUpsertGallery extends Action {
    payload: {
        gallery: Gallery,
        isFresh: boolean
    }
}

interface ActionDeleteGallery extends Action {
    payload: string
}

interface ActionUpsertReceipt extends Action {
    payload: {
        receipt: Receipt,
        isFresh: boolean
    }
}

interface ActionDeleteReceipt extends Action {
    payload: string
}
