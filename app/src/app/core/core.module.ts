import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {AuthService} from './services/auth.service';
import {ObservableStore} from '../shared/utilities/observable-store';
import {CoreState, rootReducer} from './core.store';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [
        SidebarComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ],
    exports: [
        SidebarComponent
    ],
    providers: [
        AuthService,
        ObservableStore
    ]
})
export class CoreModule {
    constructor(private redux: ObservableStore<CoreState>) {
        // @ts-ignore
        this.redux.configureStore(rootReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    }
}
