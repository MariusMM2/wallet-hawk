import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Category} from '../models/category';
import {API_BASE} from '../../shared/constants';
import {AuthService} from './auth.service';
import {BudgetItem} from '../models/budgetItem';
import {Creator} from '../types/creator';

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

        for (let budgetItem of budgetItems) {
            budgetItem.date = new Date(budgetItem.date);
        }

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
