import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmationModalComponent} from './confirmation-modal.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDialogRefMock} from '../../utilities/spec.utils';

describe('ConfirmationModalComponent', () => {
    let component: ConfirmationModalComponent;
    let fixture: ComponentFixture<ConfirmationModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ConfirmationModalComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useClass: MatDialogRefMock
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {}

                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmationModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
