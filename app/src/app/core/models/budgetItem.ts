import {Category} from './category';

export interface BudgetItem {
    id: string;
    name: string;
    description: string;
    totalPrice: number;
    quantity: number;
    date: Date;
    categoryList?: Array<Category>;
    categoryIds?: Array<string>;
}
