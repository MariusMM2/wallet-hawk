import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OkModalComponent} from './ok-modal.component';

describe('OkModalComponent', () => {
    let component: OkModalComponent;
    let fixture: ComponentFixture<OkModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
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
