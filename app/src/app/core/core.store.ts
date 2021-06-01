import {combineReducers} from 'redux';
import {authReducer} from './reducers/auth.reducer';
import {dataReducer} from './reducers/data.reducer';
import {BudgetItem, Category, Gallery, Goal, Receipt, Recurrence, User} from './models';

export interface AuthState {
    user: User | null;
    errors: Array<String> | null;
}

export interface DataState {
    categoryList: Array<Category> | null,
    galleryList: Array<Gallery> | null,
    receiptList: Array<Receipt> | null,
    budgetItemList: Array<BudgetItem> | null,
    recurrenceList: Array<Recurrence> | null,
    user: UserDataState
}

interface UserDataState {
    budgetItemList: Array<BudgetItem> | null,
    goal: Goal | null
}

export interface CoreState {
    auth?: AuthState,
    data?: DataState
}

/**
 * Redux Reduces that combines all other reducers to form the
 * root state.
 */
export const rootReducer = combineReducers<CoreState>({
    auth: authReducer,
    data: dataReducer
});
