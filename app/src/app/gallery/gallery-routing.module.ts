import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GalleryComponent} from './gallery.component';

const routes: Routes = [
    {path: '', component: GalleryComponent}
];

/**
 * Angular Module that holds navigation routes related to receipt galleries.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GalleryRoutingModule {
}
