import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SidebarComponent} from './core/components/sidebar/sidebar.component';
import {AuthGuard} from './core/guards/auth.guard';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {AnonGuard} from './core/guards/anon.guard';

export const routes: Routes = [
    {path: 'sidebar', component: SidebarComponent},
    {path: 'footer', component: FooterComponent},
    {
        path: 'login',
        loadChildren: () => import('./authenticate/authenticate.module').then(m => m.AuthenticateModule),
        canActivate: [AnonGuard]
    },
    {
        path: 'home/dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'home/gallery',
        loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'home/statistics',
        loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'home/settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'home/search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'home/recurrence',
        loadChildren: () => import('./recurrence/recurrence.module').then(m => m.RecurrenceModule),
        canActivate: [AuthGuard]
    },
    {path: 'home', redirectTo: '/home/dashboard', pathMatch: 'full'},
    {path: '', redirectTo: '/home/dashboard', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent}
];

/**
 * Angular Module that holds application-wide navigation routes.
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
