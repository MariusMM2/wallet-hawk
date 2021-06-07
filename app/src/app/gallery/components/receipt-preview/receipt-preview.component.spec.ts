import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReceiptPreviewComponent} from './receipt-preview.component';
import {SortPipe} from '../../../shared/pipes/sort.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';

describe('ReceiptPreviewComponent', () => {
    let component: ReceiptPreviewComponent;
    let fixture: ComponentFixture<ReceiptPreviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                HttpClientModule,
                MatDialogModule
            ],
            declarations: [ReceiptPreviewComponent, SortPipe]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReceiptPreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
