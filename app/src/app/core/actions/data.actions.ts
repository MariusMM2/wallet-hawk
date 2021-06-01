import {Action} from 'redux';
import {DataState} from '../core.store';
import {Creator} from '../types/creator';
import {BudgetItem} from '../models';

export enum DataActions {
    INITIALIZE_DATA = 'Data.INITIALIZE_DATA',
    CLEAR_DATA = 'Data.CLEAR_DATA',
    UPSERT_BUDGET_ITEM = 'Data.UPSERT_BUDGET_ITEM',
    DELETE_BUDGET_ITEM = 'Data.DELETE_BUDGET_ITEM'
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
        id: string,
    }
}
