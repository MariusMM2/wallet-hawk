import {Category} from './category';
import {Creator} from '../types/creator';

export interface BudgetItem {
    id: string;
    creatorType?: Creator;
    name: string;
    description: string;
    totalPrice: number;
    quantity: number;
    date: Date;
    categoryList?: Array<Category>;
    categoryIds?: Array<string>;
}

export interface SubmissionBudgetItem {
    id: string;
    name: string;
    description: string;
    totalPrice: number;
    quantity: number;
    date: Date | string;
    categoryList?: Array<Category>;
    categoryIds?: Array<string>;
    priceType?: string;
    returnInsteadOfDispatch?: boolean;
}
