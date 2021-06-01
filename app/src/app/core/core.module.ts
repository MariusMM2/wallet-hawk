import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SidebarComponent} from './components/sidebar/sidebar.component';
import {AuthService} from './services/auth.service';
import {StoreService} from './services/store.service';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {RouterService} from './services/router.service';
import {HttpService} from './services/http.service';
import {SidebarItemComponent} from './components/sidebar-item/sidebar-item.component';

/**
 * Angular Module that contains core features shared across other modules.
 */
@NgModule({
    declarations: [
        SidebarComponent,
        SidebarItemComponent
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
        StoreService,
        RouterService,
        HttpService
    ]
})
export class CoreModule {
}
