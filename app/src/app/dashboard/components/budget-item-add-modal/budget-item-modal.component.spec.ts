import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BudgetItemModalComponent} from './budget-item-modal.component';

describe('BudgetItemModalComponent', () => {
    let component: BudgetItemModalComponent;
    let fixture: ComponentFixture<BudgetItemModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BudgetItemModalComponent]
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
