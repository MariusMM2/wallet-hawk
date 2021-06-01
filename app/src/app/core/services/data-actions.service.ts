import {Injectable} from '@angular/core';
import {StoreService} from './store.service';
import {DataService} from './data.service';
import {BudgetItem, Category} from '../models';
import {ModelUtils} from '../../shared/utilities/model.utils';
import {Creator} from '../types/creator';
import {DataActions} from '../actions/data.actions';
import {GalleryResponseData} from '../types/galleryResponseData';

@Injectable({
    providedIn: 'root'
})
export class DataActionsService {
    constructor(
        private store: StoreService,
        private service: DataService) {
    }

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

        let galleryResponseData: GalleryResponseData;
        try {
            galleryResponseData = await this.service.getUserGalleries(userId);
        } catch (errors) {
            console.log(errors);
        }

        let galleryList = galleryResponseData?.galleryList;
        let receiptList = galleryResponseData?.receiptList;
        let budgetItemList = galleryResponseData?.budgetItemList;

        ModelUtils.parseBudgetItemCategories(budgetItemList, categoryList);

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
