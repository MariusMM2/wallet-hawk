import {Injectable} from '@angular/core';
import {CoreState} from '../core.store';
import {ObservableStore} from '../../shared/utilities/redux.utils';
import {DataService} from '../services/data.service';

@Injectable({
    providedIn: 'root'
})
export class DataActions {
    constructor(
        private redux: ObservableStore<CoreState>,
        private service: DataService) {
    }

    static readonly INITIALIZE_DATA = 'Data.INITIALIZE_DATA';

    /**
     * TODO implement
     * Initializes store with data retrieved for
     * the current user
     */
    async initializeProperties(): Promise<void> {
        // httpclient request
        // noinspection UnnecessaryLocalVariableJS
        const response = this.service;

        this.redux.dispatch({
            type: DataActions.INITIALIZE_DATA,
            payload: response
        });
    }
}
