import {createStore} from 'redux';
import {User} from './models/user';
import {Gallery} from './models/gallery';
import {Category} from './models/category';
import {BudgetItem} from './models/budgetItem';
import {Recurrence} from './models/recurrence';
import {coreReducer} from './reducers/core.reducer';
import {Receipt} from './models/receipt';

export interface CoreState {
    user: User | null;
    categoryList: Category[] | null;
    galleryList: Gallery[] | null;
    receipts: Receipt[] | null;
    budgetItemList: BudgetItem[] | null;
    recurrenceList: Recurrence[] | null;
}

export const AppStore = createStore(coreReducer);
