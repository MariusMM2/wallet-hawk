import {Pipe, PipeTransform} from '@angular/core';
import {Category} from '../../core/models/category';
import StringUtils from '../utilities/string.utils';

// margin * 2 + border * 2 + padding * 2
const CHIP_WIDTH = 2.5 * 2 + 3 * 2 + 8 * 2;
// card-width - row-margin? - more-icon-width -more-icon-right-margin
const MAX_WIDTH = 350 - 2 - 24 - 4;// 320

/**
 * Angular Pipe that
 */
@Pipe({
    name: 'limitLabels'
})
export class LimitLabelsPipe implements PipeTransform {
    transform(categories: Array<Category>, chipWidth?: number, maxWidth?: number): unknown {
        // Width of a chip, excluding the text inside it
        const _chipWidth = chipWidth || CHIP_WIDTH;
        // Maximum width allowed
        const _maxWidth = maxWidth || MAX_WIDTH;

        // Width of the '+n' chip
        const extraLabelWidth = _chipWidth + StringUtils.getTextWidth('+9');

        // If there is only one category or none, either return an array with
        // its label, or an empty array
        if (categories.length < 2) {
            return categories.map(category => category.label);
        }

        // Strings to be added to their own chip
        const shownCategoryChips: Array<String> = new Array<String>();

        // Remaining space allowed on the chips row after the insertion of a chip
        let remainingWidth = _maxWidth - extraLabelWidth;
        for (let item of categories) {
            const label = item.label;
            // Subtracts the width of the chip and its text from the remaining space
            remainingWidth = remainingWidth - (_chipWidth + StringUtils.getTextWidth(label));

            // If the remaining space is negative, the chip won't fit, so skip adding it to the list
            if (remainingWidth < 0) {
                break;
            }

            shownCategoryChips.push(label);
        }

        // Adds the '+n' label at the end of the array if not all categories fit in the chip row
        if (shownCategoryChips.length < categories.length &&
            remainingWidth < 0) {
            // Creates the '+n' label, and limits it to showing at most '+9' if there were more than 9 categories
            // remaining to be added
            const remaindersLabel = `+${Math.min(9, categories.length - shownCategoryChips.length)}`;
            shownCategoryChips.push(remaindersLabel);
        }

        return shownCategoryChips;
    }
}
