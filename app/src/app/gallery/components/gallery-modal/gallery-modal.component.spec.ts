import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GalleryModalComponent} from './gallery-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDialogRefMock} from '../../../shared/utilities/spec.utils';
import {HttpClientModule} from '@angular/common/http';

describe('GalleryModalComponent', () => {
    let component: GalleryModalComponent;
    let fixture: ComponentFixture<GalleryModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                HttpClientModule
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
            declarations: [GalleryModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GalleryModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
