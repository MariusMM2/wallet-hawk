import {Identifiable} from './identifiable';

export interface Receipt extends Identifiable {
    description: string;
    date: Date;
    image: string;
    budgetItemIds: string[];
}
