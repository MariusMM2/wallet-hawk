import {Pipe, PipeTransform} from '@angular/core';

/**
 * Angular Pipe that filters a list of items based on an item field and its value.
 */
@Pipe({
    name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

    transform<T>(list: Array<T>, filterField: keyof T, filterValue: any): Array<T> {
        if (list.length === 0) {
            return list;
        }

        return list.filter(item => item[filterField] === filterValue);
    }

}
