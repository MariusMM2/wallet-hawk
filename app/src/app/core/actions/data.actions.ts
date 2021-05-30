import {Injectable} from '@angular/core';
import {CoreState, DataState} from '../core.store';
import {ObservableStore} from '../../shared/utilities/redux.utils';
import {DataService} from '../services/data.service';
import {BudgetItem} from '../models/budgetItem';
import {Category} from '../models/category';
import {ModelUtils} from '../../shared/utilities/model.utils';
import {Creator} from '../types/creator';
import {Action} from 'redux';

@Injectable({
    providedIn: 'root'
})
export class DataActions {
    constructor(
        private store: ObservableStore<CoreState>,
        private service: DataService) {
    }

    static readonly INITIALIZE_DATA = 'Data.INITIALIZE_DATA';
    static readonly CLEAR_DATA = 'Data.CLEAR_DATA';
    static readonly UPSERT_BUDGET_ITEM = 'Data.UPSERT_BUDGET_ITEM';
    static readonly DELETE_BUDGET_ITEM = 'Data.DELETE_BUDGET_ITEM';

    /**
     * TODO implement
     * Initializes store with data retrieved for the current user.
     */
    async retrieveData(): Promise<void> {
        const userId = this.getUserId();

        let categoryList: Array<Category> = null;
        try {
            categoryList = await this.service.getGlobalCategories();
        } catch (errors) {
            console.log(errors);
        }

        let galleryList = [];
        let receiptList = [];
        let budgetItemList = [];
        let recurrenceList = [];

        const user = {
            budgetItemList: null,
            goal: null
        };

        try {
            const budgetItemList: Array<BudgetItem> = await this.service.getUserBudgetItems(userId);

            if (categoryList) {
                ModelUtils.parseBudgetItemCategories(budgetItemList, categoryList);
            }

            user.budgetItemList = budgetItemList;
        } catch (errors) {
            console.log(errors);
        }

        this.store.dispatch({
            type: DataActions.INITIALIZE_DATA,
            payload: {
                categoryList,
                galleryList,
                receiptList,
                budgetItemList,
                recurrenceList,
                user
            }
        });
    }

    /**
     * Updates an existing budget item of a user, or creates a new one if it does not exist.
     * @param budgetItem
     */
    async updateUserBudgetItem(budgetItem: BudgetItem): Promise<boolean> {
        const userId = this.getUserId();

        return this.updateBudgetItem(userId, 'user', budgetItem);
    }

    private async updateBudgetItem(creatorId: string, creatorType: Creator, budgetItem: BudgetItem): Promise<boolean> {
        let resultBudgetItem;
        try {
            resultBudgetItem = await this.service.updateBudgetItem(creatorId, creatorType, budgetItem);
        } catch (errors) {
            console.log(errors);
            return false;
        }

        const categoryList: Array<Category> = this.store.getState(state => state.data.categoryList);

        ModelUtils.parseBudgetItemCategories(resultBudgetItem, categoryList);

        this.store.dispatch({
            type: DataActions.UPSERT_BUDGET_ITEM,
            payload: {
                creator: creatorType,
                budgetItem: resultBudgetItem,
                isFresh: !budgetItem.id
            }
        });

        return true;
    }

    /**
     * Deletes an existing budget item.
     * @param budgetItem
     */
    async deleteUserBudgetItem(budgetItem: BudgetItem): Promise<boolean> {
        const userId = this.getUserId();

        return this.deleteBudgetItem(userId, 'user', budgetItem);
    }

    private async deleteBudgetItem(creatorId: string, creatorType: Creator, budgetItem: BudgetItem): Promise<boolean> {
        try {
            await this.service.deleteBudgetItem(creatorId, creatorType, budgetItem);
        } catch (errors) {
            console.log(errors);
            return false;
        }

        this.store.dispatch({
            type: DataActions.DELETE_BUDGET_ITEM,
            payload: {
                creator: creatorType,
                id: budgetItem.id
            }
        });

        return true;
    }

    /**
     * TODO implement
     * Clears store of data of the recently logged out user.
     */
    clearLocalData(): void {
        this.store.dispatch({
            type: DataActions.CLEAR_DATA
        });
    }

    private getUserId(): string {
        return this.store.getState(state => state.auth.user.id);
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
