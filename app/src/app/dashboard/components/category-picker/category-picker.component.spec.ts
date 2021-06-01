import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoryPickerComponent} from './category-picker.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

describe('CategoryPickerComponent', () => {
    let component: CategoryPickerComponent;
    let fixture: ComponentFixture<CategoryPickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CategoryPickerComponent],
            imports: [
                MatAutocompleteModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryPickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
