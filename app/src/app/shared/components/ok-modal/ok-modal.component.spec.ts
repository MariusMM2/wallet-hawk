import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OkModalComponent} from './ok-modal.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDialogRefMock} from '../../utilities/spec.utils';

describe('OkModalComponent', () => {
    let component: OkModalComponent;
    let fixture: ComponentFixture<OkModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
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
            declarations: [OkModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OkModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
