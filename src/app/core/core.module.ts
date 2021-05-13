import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {AuthService} from './services/auth.service';
import {ObservableStore} from '../shared/utilities/observable-store';
import {AppStore, CoreState} from './core.store';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        SidebarComponent
    ],
    providers: [
        AuthService,
        ObservableStore
    ]
})
export class CoreModule {
    constructor(private redux: ObservableStore<CoreState>) {
        redux.provideStore(AppStore);
    }
}
