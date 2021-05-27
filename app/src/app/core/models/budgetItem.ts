import {Identifiable} from './identifiable';
import {Category} from './category';

export interface BudgetItem extends Identifiable {
    name: string;
    description: string;
    totalPrice: number;
    quantity: number;
    date: Date;
    categoryList?: Array<Category>;
    categoryIds?: Array<string>;
}
