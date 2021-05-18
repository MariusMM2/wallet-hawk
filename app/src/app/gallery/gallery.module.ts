import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GalleryRoutingModule} from './gallery-routing.module';
import {GalleryComponent} from './gallery.component';

/**
 * Angular Module that contains features related to receipt galleries.
 */
@NgModule({
    declarations: [
        GalleryComponent
    ],
    imports: [
        CommonModule,
        GalleryRoutingModule
    ]
})
export class GalleryModule {
}
