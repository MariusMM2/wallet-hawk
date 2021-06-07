import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BudgetItemModalComponent} from './budget-item-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatDialogRefMock} from '../../../shared/utilities/spec.utils';
import {SharedModule} from '../../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('BudgetItemModalComponent', () => {
    let component: BudgetItemModalComponent;
    let fixture: ComponentFixture<BudgetItemModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BudgetItemModalComponent],
            imports: [
                ReactiveFormsModule,
                HttpClientModule,
                MatDialogModule,
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
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BudgetItemModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
