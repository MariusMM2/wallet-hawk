import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GalleryRoutingModule} from './gallery-routing.module';
import {GalleryComponent} from './gallery.component';
import {SharedModule} from '../shared/shared.module';
import {ReceiptPreviewComponent} from './components/receipt-preview/receipt-preview.component';

/**
 * Angular Module that contains features related to receipt galleries.
 */
@NgModule({
    declarations: [
        GalleryComponent,
        ReceiptPreviewComponent
    ],
    imports: [
        CommonModule,
        GalleryRoutingModule,
        SharedModule
    ]
})
export class GalleryModule {
}
