import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReceiptPreviewComponent} from './receipt-preview.component';
import {SortPipe} from '../../../shared/pipes/sort.pipe';

describe('ReceiptPreviewComponent', () => {
    let component: ReceiptPreviewComponent;
    let fixture: ComponentFixture<ReceiptPreviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
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
