import {AnyAction, createStore, PreloadedState, Reducer, Store, StoreEnhancer} from 'redux';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

import {Injectable, NgZone} from '@angular/core';
import {CoreState, rootReducer} from '../core.store';

export type Comparator = (x: any, y: any) => boolean;

// noinspection JSUnusedGlobalSymbols
/**
 * This interface represents the glue that connects the
 * subscription-oriented Redux Store with the RXJS Observable-oriented
 * Angular component world.
 *
 * Augments the basic Redux store interface with methods to
 * enable selection
 */
@Injectable({
    providedIn: 'root'
})
export class StoreService {

    private reduxStore: Store<CoreState> | undefined = undefined;
    private state$: BehaviorSubject<CoreState>;

    constructor(private ngZone: NgZone) {
        this.state$ = new BehaviorSubject<CoreState>({} as CoreState);
        // @ts-ignore
        this.configureStore(rootReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    }

    configureStore(
        reducer: Reducer<CoreState>,
        initState: PreloadedState<CoreState>,
        enhancer?: StoreEnhancer<CoreState>) {
        this.reduxStore = createStore(reducer, initState, enhancer);
        this.state$.next(this.reduxStore.getState());
        this.reduxStore.subscribe(() => this.state$.next(this.reduxStore.getState()));
    }

    provideStore(store: Store<CoreState>) {
        this.reduxStore = store;
        this.state$.next(this.reduxStore.getState());
        this.reduxStore.subscribe(() => this.state$.next(this.reduxStore.getState()));
    };

    /**
     * This method can be used to get some part of the redux state synchronously
     */
    getState<SelectedType>(selector?: (state: CoreState) => SelectedType): SelectedType {
        return selector(this.reduxStore.getState());
    }

    /**
     * This method can be used to get some part of the redux state asynchronously
     */
    select<SelectedType>(selector?: (state: CoreState) => SelectedType, comparator?: Comparator): Observable<SelectedType> {
        return this.state$.asObservable().pipe(
            distinctUntilChanged(),
            map(state => selector(state)),
            distinctUntilChanged(comparator)
        );
    }

    dispatch<A extends AnyAction>(action: A) {
        return NgZone.isInAngularZone() ?
            this.reduxStore.dispatch(action) :
            this.ngZone.run(() => this.reduxStore.dispatch(action));
    };

    subscribe(listener: () => void) {
        return this.reduxStore.subscribe(listener);
    }

}
