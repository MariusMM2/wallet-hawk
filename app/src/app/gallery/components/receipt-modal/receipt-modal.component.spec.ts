import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReceiptModalComponent} from './receipt-modal.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatDialogRefMock} from '../../../shared/utilities/spec.utils';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ReceiptModalComponent', () => {
    let component: ReceiptModalComponent;
    let fixture: ComponentFixture<ReceiptModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatDialogModule,
                ReactiveFormsModule,
                HttpClientModule,
                BrowserAnimationsModule,
                SharedModule
            ],
            providers: [
                {
                    provide: MatDialogRef,
                    useClass: MatDialogRefMock
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {}
                }
            ],
            declarations: [ReceiptModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReceiptModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
