import {Pipe, PipeTransform} from '@angular/core';
import {Category} from '../../core/models/category';

/**
 * Angular Pipe that converts a list of categories objects to an array of their labels.
 */
@Pipe({
    name: 'labelArray'
})
export class LabelArrayPipe implements PipeTransform {

    transform(categories: Array<Category>): Array<string> {
        return categories.map(category => category.label);
    }
}
