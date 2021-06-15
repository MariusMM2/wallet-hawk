import {Injectable} from '@angular/core';
import {StoreService} from './store.service';
import {DataService} from './data.service';
import {BudgetItem, Category, Gallery, Receipt, SubmissionBudgetItem, SubmissionReceipt} from '../models';
import {ModelUtils} from '../../shared/utilities/model.utils';
import {Creator} from '../types/creator';
import {DataActions} from '../actions/data.actions';
import {GalleryResponseData} from '../types/galleryResponseData';
import StringUtils from '../../shared/utilities/string.utils';

@Injectable({
    providedIn: 'root'
})
export class DataActionsService {
    constructor(
        private store: StoreService,
        private service: DataService) {
    }

    /**
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
     * @param {BudgetItem} budgetItem
     */
    async upsertUserBudgetItem(budgetItem: SubmissionBudgetItem): Promise<BudgetItem> {
        const userId = this.getUserId();

        return this.upsertBudgetItem(userId, 'user', budgetItem);
    }

    /**
     * Updates an existing budget item of a receipt, or creates a new one if it does not exist.
     * @param receiptId
     * @param {BudgetItem} budgetItem
     */
    async upsertReceiptBudgetItem(receiptId: string, budgetItem: SubmissionBudgetItem): Promise<BudgetItem> {
        return this.upsertBudgetItem(receiptId, 'receipt', budgetItem);
    }

    private async upsertBudgetItem(creatorId: string, creatorType: Creator, budgetItem: SubmissionBudgetItem): Promise<BudgetItem> {
        budgetItem.date = StringUtils.normalizeDate(budgetItem.date);
        let resultBudgetItem;
        try {
            resultBudgetItem = await this.service.upsertBudgetItem(creatorId, creatorType, budgetItem);
        } catch (errors) {
            console.log(errors);
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

        return resultBudgetItem;
    }

    /**
     * Deletes an existing budget item of a user.
     * @param budgetItemId
     */
    async deleteUserBudgetItem(budgetItemId: string): Promise<boolean> {
        const userId = this.getUserId();

        return this.deleteBudgetItem(userId, 'user', budgetItemId);
    }

    /**
     * Deletes an existing budget item.
     * @param {string} creatorId
     * @param {Creator} creatorType
     * @param budgetItemId
     * @private
     */
    private async deleteBudgetItem(creatorId: string, creatorType: Creator, budgetItemId: string): Promise<boolean> {
        try {
            await this.service.deleteBudgetItem(creatorId, creatorType, budgetItemId);
        } catch (errors) {
            console.log(errors);
            return false;
        }

        this.store.dispatch({
            type: DataActions.DELETE_BUDGET_ITEM,
            payload: {
                creator: creatorType,
                id: budgetItemId
            }
        });

        return true;
    }

    /**
     * Updates an existing gallery of a user, or creates a new one if it does not exist.
     * @param gallery
     */
    async upsertGallery(gallery: Gallery): Promise<boolean> {
        const userId = this.getUserId();

        let resultGallery;
        try {
            resultGallery = await this.service.upsertGallery(userId, gallery);
        } catch (errors) {
            console.log(errors);
            return false;
        }

        this.store.dispatch({
            type: DataActions.UPSERT_GALLERY,
            payload: {
                gallery: resultGallery,
                isFresh: !gallery.id
            }
        });

        return true;
    }

    /**
     * Deletes an existing gallery.
     * @param gallery
     */
    async deleteGallery(gallery: Gallery): Promise<boolean> {
        const userId = this.getUserId();

        try {
            await this.service.deleteGallery(userId, gallery);
        } catch (errors) {
            console.log(errors);
            return false;
        }

        this.store.dispatch({
            type: DataActions.DELETE_GALLERY,
            payload: gallery.id
        });

        return true;
    }

    /**
     * Creates a receipt and its included budget items.
     * @param galleryId
     * @param receipt
     */
    async createReceipt(galleryId: string, receipt: SubmissionReceipt): Promise<boolean> {
        const userId = this.getUserId();
        const {budgetItems} = receipt;

        delete receipt.budgetItems;
        receipt.date = StringUtils.normalizeDate(receipt.date);
        let resultReceipt;
        try {
            resultReceipt = await this.service.createReceipt(userId, galleryId, receipt);
        } catch (errors) {
            console.log(errors);
            return false;
        }

        let resultBudgetItems: Array<BudgetItem> = [];
        for (const budgetItem of budgetItems) {
            let resultBudgetItem;
            try {
                resultBudgetItem = await this.upsertReceiptBudgetItem(resultReceipt.id, budgetItem);
            } catch (errors) {
                console.log(errors);
                return false;
            }

            resultBudgetItems.push(resultBudgetItem);
        }

        resultReceipt.budgetItemIds = resultBudgetItems.map(budgetItem => budgetItem.id);

        this.store.dispatch({
            type: DataActions.UPSERT_RECEIPT,
            payload: {
                receipt: resultReceipt,
                isFresh: true
            }
        });

        return true;
    }

    /**
     * Updates the description of a receipt belonging to a gallery.
     * @param receiptId
     * @param {Partial<Receipt>} partialReceipt
     */
    async updateReceipt(receiptId: string, partialReceipt: Partial<Receipt>): Promise<boolean> {
        const userId = this.getUserId();

        let resultReceipt;
        try {
            resultReceipt = await this.service.updateReceipt(userId, receiptId, partialReceipt);
        } catch (errors) {
            console.log(errors);
            return false;
        }

        this.store.dispatch({
            type: DataActions.UPSERT_RECEIPT,
            payload: {
                receipt: resultReceipt,
                isFresh: false
            }
        });

        return true;
    }

    /**
     * Deletes an existing receipt.
     * @param receipt
     */
    async deleteReceipt(receipt: Receipt): Promise<boolean> {
        const userId = this.getUserId();

        const {budgetItemIds} = receipt;

        for (const budgetItemId of budgetItemIds) {
            try {
                await this.service.deleteBudgetItem(receipt.id, 'receipt', budgetItemId);
            } catch (errors) {
                console.log(errors);
                return false;
            }
        }

        try {
            await this.service.deleteReceipt(userId, receipt.id);
        } catch (errors) {
            console.log(errors);
            return false;
        }

        for (const budgetItemId of budgetItemIds) {
            this.store.dispatch({
                type: DataActions.DELETE_BUDGET_ITEM,
                payload: {
                    creator: 'receipt',
                    id: budgetItemId
                }
            });
        }

        this.store.dispatch({
            type: DataActions.DELETE_RECEIPT,
            payload: receipt.id
        });

        return true;
    }

    /**
     * Clears store of data of the recently logged out user.
     */
    clearLocalData(): void {
        this.store.dispatch({
            type: DataActions.CLEAR_DATA
        });
    }

    /**
     * Returns the id of the logged in user.
     * @private
     */
    private getUserId(): string {
        return this.store.getState(state => state.auth.user.id);
    }
}
