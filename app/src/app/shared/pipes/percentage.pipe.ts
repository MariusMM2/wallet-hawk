import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

    transform(value: number | null = null): number {
        if (value === null) {
            return null;
        }
        return Math.floor(value * 100 + 0.5);
    }

}
