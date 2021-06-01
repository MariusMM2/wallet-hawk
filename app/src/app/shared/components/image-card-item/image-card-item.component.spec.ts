import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageCardItemComponent} from './image-card-item.component';

describe('ImageCardItemComponent', () => {
    let component: ImageCardItemComponent;
    let fixture: ComponentFixture<ImageCardItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImageCardItemComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageCardItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
