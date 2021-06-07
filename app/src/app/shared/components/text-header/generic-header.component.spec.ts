import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GenericHeaderComponent} from './generic-header.component';
import {SharedModule} from '../../shared.module';

describe('GenericHeaderComponent', () => {
    let component: GenericHeaderComponent;
    let fixture: ComponentFixture<GenericHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SharedModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GenericHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
