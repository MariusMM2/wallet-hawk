import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BudgetItemModalComponent} from './budget-item-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';

xdescribe('BudgetItemModalComponent', () => {
    let component: BudgetItemModalComponent;
    let fixture: ComponentFixture<BudgetItemModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BudgetItemModalComponent],
            imports: [
                ReactiveFormsModule,
                HttpClientModule,
                MatDialogModule
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
