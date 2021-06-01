import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {BudgetItem, Category, Gallery, Receipt} from '../models';
import {API_BASE} from '../../shared/constants';
import {AuthService} from './auth.service';
import {Creator} from '../types/creator';
import {GalleryResponseData} from '../types/galleryResponseData';
import {ModelUtils} from '../../shared/utilities/model.utils';

/**
 * Angular Service responsible for communicating with the backend
 * in regards to application data.
 */
@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpService) {
    }

    async getGlobalCategories(): Promise<Array<Category>> {
        const url = `${API_BASE}/data/category`;
        try {
            return await this.http.get<Array<Category>>(url);
        } catch (response) {
            console.log(response);
            throw AuthService.handleGenericErrors(response);
        }
    }

    async getUserGalleries(userId: string): Promise<GalleryResponseData> {
        const url = `${API_BASE}/data/user/${userId}/gallery`;
        let galleryResponseData: GalleryResponseData;
        try {
            galleryResponseData = await this.http.get<GalleryResponseData>(url);
        } catch (response) {
            console.log(response);
            throw AuthService.handleGenericErrors(response);
        }

        ModelUtils.parseBudgetItemDates(galleryResponseData.budgetItemList);

        return galleryResponseData;
    }

    async getReceiptBudgetItems(receiptId: string): Promise<Array<BudgetItem>> {
        return this.getBudgetItems(receiptId, 'receipt');
    }

    async getUserBudgetItems(userId: string): Promise<Array<BudgetItem>> {
        return this.getBudgetItems(userId, 'user');
    }

    private async getBudgetItems(creatorId: string, creatorType: Creator): Promise<Array<BudgetItem>> {
        const url = `${API_BASE}/data/${creatorType}/${creatorId}/budget-item`;
        let budgetItems: Array<BudgetItem> = null;
        try {
            budgetItems = await this.http.get<Array<BudgetItem>>(url);
        } catch (response) {
            console.log(response);
            throw AuthService.handleGenericErrors(response);
        }

        ModelUtils.parseBudgetItemDates(budgetItems);

        return budgetItems;
    }

    async upsertBudgetItem(creatorId: string, creatorType: Creator, budgetItem: Partial<BudgetItem>): Promise<BudgetItem> {
        const url = `${API_BASE}/data/${creatorType}/${creatorId}/budget-item/${budgetItem.id ?? ''}`;
        let resultBudgetItem: BudgetItem = null;
        try {
            resultBudgetItem = await this.http.put<BudgetItem>(url, budgetItem);
        } catch (response) {
            console.log(response);
            throw AuthService.handleGenericErrors(response);
        }

        resultBudgetItem.date = new Date(resultBudgetItem.date);

        return resultBudgetItem;
    }

    async deleteBudgetItem(creatorId: string, creatorType: Creator, budgetItemId: string): Promise<void> {
        const url = `${API_BASE}/data/${creatorType}/${creatorId}/budget-item/${budgetItemId}`;
        try {
            await this.http.delete(url);
        } catch (response) {
            console.log(response);
            throw AuthService.handleGenericErrors(response);
        }
    }

    async upsertGallery(userId: string, gallery: Gallery): Promise<Gallery> {
        const url = `${API_BASE}/data/user/${userId}/gallery/${gallery.id ?? ''}`;
        try {
            return await this.http.put<Gallery>(url, gallery);
        } catch (response) {
            console.log(response);
            throw AuthService.handleGenericErrors(response);
        }
    }

    async deleteGallery(userId: string, gallery: Gallery): Promise<void> {
        const url = `${API_BASE}/data/user/${userId}/gallery/${gallery.id}`;
        try {
            await this.http.delete(url);
        } catch (response) {
            console.log(response);
            throw AuthService.handleGenericErrors(response);
        }
    }

    async createReceipt(userId: string, galleryId: string, receipt: Receipt): Promise<Receipt> {
        const url = `${API_BASE}/data/user/${userId}/gallery/${galleryId}/receipt`;
        try {
            return await this.http.post<Receipt>(url, receipt);
        } catch (response) {
            console.log(response);
            throw AuthService.handleGenericErrors(response);
        }
    }

    async updateReceipt(userId: string, receiptId: string, partialReceipt: Partial<Receipt>): Promise<Receipt> {
        const url = `${API_BASE}/data/user/${userId}/receipt/${receiptId}`;
        try {
            return await this.http.patch(url, partialReceipt);
        } catch (response) {
            console.log(response);
            throw AuthService.handleGenericErrors(response);
        }
    }

    async deleteReceipt(userId: string, receiptId: string): Promise<void> {
        const url = `${API_BASE}/data/user/${userId}/receipt/${receiptId}`;
        try {
            await this.http.delete(url);
        } catch (response) {
            console.log(response);
            throw AuthService.handleGenericErrors(response);
        }
    }
}
