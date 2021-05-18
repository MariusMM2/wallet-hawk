import {Injectable} from '@angular/core';
import {CoreState} from '../core.store';
import {ObservableStore} from '../../shared/utilities/redux.utils';

// noinspection JSUnusedLocalSymbols
/**
 * TODO remove template when done implementing
 */
@Injectable({providedIn: 'root'})
export class TemplateActions {
    constructor(private redux: ObservableStore<CoreState>) {
    }

    static readonly ACTION_TYPE = 'ACTION_TYPE';

    action(...parameters): void {
        this.redux.dispatch({
            type: TemplateActions.ACTION_TYPE,
            payload: 'payload'
        });
    }
}
