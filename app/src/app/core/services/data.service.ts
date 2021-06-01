import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {BudgetItem, Category} from '../models';
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
        console.log(url);
        try {
            const categories = await this.http.get<Array<Category>>(url);
            console.log(categories);
            return categories;
        } catch (response) {
            console.log(response);
            throw AuthService.handleGenericErrors(response);
        }
    }

    async getUserGalleries(userId: string): Promise<GalleryResponseData> {
        const url = `${API_BASE}/data/user/${userId}/gallery`;
        console.log(url);
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

    async getUserBudgetItems(userId: string): Promise<Array<BudgetItem>> {
        const url = `${API_BASE}/data/user/${userId}/budget-item`;
        console.log(url);
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

    async updateBudgetItem(creatorId: string, creatorType: Creator, budgetItem: BudgetItem): Promise<BudgetItem> {
        const url = `${API_BASE}/data/${creatorType}/${creatorId}/budget-item`;
        console.log(url);
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

    async deleteBudgetItem(creatorId: string, creatorType: Creator, budgetItem: BudgetItem): Promise<void> {
        const url = `${API_BASE}/data/${creatorType}/${creatorId}/budget-item/${budgetItem.id}`;
        console.log(url);
        try {
            await this.http.delete(url);
        } catch (response) {
            console.log(response);
            throw AuthService.handleGenericErrors(response);
        }
    }
}
