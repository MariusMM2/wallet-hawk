import {combineReducers} from 'redux';
import {authReducer} from './reducers/auth.reducer';
import {dataReducer} from './reducers/data.reducer';
import {User} from './models/user';

export interface AuthState {
    user: User | null;
}

export interface DataState {
    categoryList: null,
    galleryList: null,
    receipts: null,
    budgetItemList: null,
    recurrenceList: null
}

export interface CoreState {
    auth?: AuthState,
    data?: DataState
}

export const rootReducer = combineReducers<CoreState>({
    auth: authReducer,
    data: dataReducer
});
