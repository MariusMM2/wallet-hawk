import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {

    transform<T>(list: Array<T>, sortField: string, desc: boolean = true): Array<T> {
        return list.slice().sort((a, b) => {
            const aElement = a[sortField];
            const bElement = b[sortField];
            if (aElement === bElement) {
                return 0;
            }

            const result = aElement > bElement ? 1 : -1;

            // By default, the function should dictate an ascending array, value-wise
            // If descending order is desired, the result should be inverted
            return desc ? -result : result;
        });
    }
}
