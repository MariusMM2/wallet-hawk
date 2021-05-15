import {Identifiable} from './identifiable';
import {Goal} from './goal';

export interface User extends Identifiable {
    email: string;
    firstName: string;
    lastName: string;
    goal: Goal;
    budgetItemIds: string[];
}
