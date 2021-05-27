import {Injectable} from '@angular/core';
import {CoreState} from '../core.store';
import {ObservableStore} from '../../shared/utilities/redux.utils';
import {DataService} from '../services/data.service';
import {BudgetItem} from '../models/budgetItem';
import {Category} from '../models/category';

@Injectable({
    providedIn: 'root'
})
export class DataActions {
    constructor(
        private redux: ObservableStore<CoreState>,
        private service: DataService) {
    }

    static readonly INITIALIZE_DATA = 'Data.INITIALIZE_DATA';
    static readonly CLEAR_DATA = 'Data.CLEAR_DATA';

    /**
     * TODO implement
     * Initializes store with data retrieved for the current user.
     */
    async retrieveData(): Promise<void> {
        const userId: string = this.redux.getState(state => state.auth.user.id);

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
                for (const budgetItem of budgetItemList) {
                    budgetItem.categoryList = categoryList.filter(category => {
                        return budgetItem.categoryIds.some(categoryId => categoryId === category.id);
                    });

                    delete budgetItem.categoryIds;
                }
            }

            user.budgetItemList = budgetItemList;
        } catch (errors) {
            console.log(errors);
        }

        this.redux.dispatch({
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
     * TODO implement
     * Clears store of data of the recently logged out user.
     */
    clearLocalData(): void {
        this.redux.dispatch({
            type: DataActions.CLEAR_DATA
        });
    }
}
