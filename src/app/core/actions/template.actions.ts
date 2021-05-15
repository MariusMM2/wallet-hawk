import {Injectable} from '@angular/core';
import {CoreState} from '../core.store';
import {ObservableStore} from '../../shared/utilities/observable-store';

@Injectable({providedIn: 'root'})
export class TemplateActions {
    constructor(private redux: ObservableStore<CoreState>) {
    }

    /**
     * TODO remove template when done implementing
     */
    static ACTION_TYPE = 'ACTION_TYPE';

    /**
     * TODO remove template when done implementing
     * @param parameters
     */
    action(...parameters): void {
        this.redux.dispatch({
            type: TemplateActions.ACTION_TYPE,
            payload: 'payload'
        });
    }
}
