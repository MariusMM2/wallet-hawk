import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BudgetItemComponent} from './budget-item.component';
import {StoreService} from '../../../core/services/store.service';
import {LOCALE_ID} from '@angular/core';
import localeDa from '@angular/common/locales/da';
import {registerLocaleData} from '@angular/common';
import {MatModule} from '../../mat.module';
import {LimitLabelsPipe} from '../../pipes/limit-labels.pipe';
import {AbsolutePipe} from '../../pipes/absolute.pipe';

describe('BudgetItemComponent', () => {
    let component: BudgetItemComponent;
    let fixture: ComponentFixture<BudgetItemComponent>;

    beforeAll(() => {
        registerLocaleData(localeDa);
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BudgetItemComponent, LimitLabelsPipe, AbsolutePipe],
            imports: [
                MatModule
            ],
            providers: [
                StoreService,
                {
                    provide: LOCALE_ID,
                    useValue: localeDa
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BudgetItemComponent);
        component = fixture.componentInstance;
        component.item = {
            id: '1',
            name: 'asd',
            description: 'fgh',
            totalPrice: 1,
            quantity: 10,
            date: undefined
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
