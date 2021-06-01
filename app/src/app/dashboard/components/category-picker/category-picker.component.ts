import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Category} from '../../../core/models';

@Component({
    selector: 'app-category-picker',
    templateUrl: 'category-picker.component.html',
    styleUrls: ['category-picker.component.scss'],
})
export class CategoryPickerComponent implements OnInit {

    // TODO uncomment when adding user created categories
    // separatorKeysCodes: number[] = [ENTER, COMMA];

    @Input() allCategories: Array<Category> = null;
    @Input() categories: Array<Category> = [];
    @Output() categoriesChange = new EventEmitter<Array<Category>>();

    categoryCtrl = new FormControl();
    filteredCategories$: Observable<Array<Category>>;

    @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    ngOnInit() {
        this.filteredCategories$ = this.categoryCtrl.valueChanges.pipe(
            map((categoryLabel: string | Category | null) => {
                return this._filter(categoryLabel);
            }));
    }

    /**
     * TODO reimplement when adding user created categories
     */
    // add(event: MatChipInputEvent): void {
    //     const input = event.input;
    //     const category: Category = event.value;
    //
    //     this.categories.push(category);
    //     this.updateList(this.categories);
    //     this.categoryInput.nativeElement.value = '';
    //     this.categoryCtrl.setValue(null);
    // }

    remove(category: Category): void {
        const index = this.categories.indexOf(category);

        if (index >= 0) {
            this.categories.splice(index, 1);
            this.updateList(this.categories);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const category: Category = event.option.value;

        if (category) {
            this.categories.push(category);
            this.updateList(this.categories);
            this.categoryInput.nativeElement.value = '';
            this.categoryCtrl.setValue(null);
        }
    }

    updateList(categories: Array<Category>): void {
        this.categoriesChange.emit(categories);
    }

    private _filter(category: string | Category | null): Array<Category> {
        // Filters only the categories that have not already been added
        const availableCategories: Array<Category> = this.allCategories.filter(category => {
            return !this.categories.includes(category);
        });

        // If no search string or category is provided, return the above list
        if (!category) {
            return availableCategories;
        }

        // Trim and convert to lowercase if a string, or retrieve the label if a Category
        let filterValue: string;
        if (typeof category !== 'string') {
            filterValue = category.label.trim().toLowerCase();
        } else {
            filterValue = category.trim().toLowerCase();
        }

        // Filter only categories that match the filter string
        return availableCategories.filter(category => {
            return category.label.toLowerCase().indexOf(filterValue) !== -1;
        });
    }
}
