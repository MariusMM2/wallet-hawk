import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GalleryRoutingModule} from './gallery-routing.module';
import {GalleryComponent} from './gallery.component';
import {SharedModule} from '../shared/shared.module';
import {ReceiptPreviewComponent} from './components/receipt-preview/receipt-preview.component';
import {GalleryModalComponent} from './components/gallery-modal/gallery-modal.component';
import {ReceiptModalComponent} from './components/receipt-modal/receipt-modal.component';
import {TesseractService} from './services/tesseract.service';
import {locale} from '../app.config';
import {MAT_DATE_LOCALE} from '@angular/material/core';

/**
 * Angular Module that contains features related to receipt galleries.
 */
@NgModule({
    declarations: [
        GalleryComponent,
        ReceiptPreviewComponent,
        GalleryModalComponent,
        ReceiptModalComponent
    ],
    imports: [
        CommonModule,
        GalleryRoutingModule,
        SharedModule
    ],
    providers: [
        TesseractService,
        {
            provide: LOCALE_ID,
            useValue: locale
        },
        {
            provide: MAT_DATE_LOCALE,
            useValue: locale
        }
    ]
})
export class GalleryModule {
}
