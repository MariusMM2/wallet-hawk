import {Pipe, PipeTransform} from '@angular/core';
import {BudgetItem} from '../../core/models/budgetItem';
import ChartUtils from '../utilities/chart.utils';
import {Category} from '../../core/models/category';

/**
 * Angular Pipe that wraps ChartUtil's getCategoryPointsForBudgetItems.
 */
@Pipe({
    name: 'categoryPoints'
})
export class CategoryPointsPipe implements PipeTransform {
    transform(budgetItems: Array<BudgetItem>, categories: Array<Category>): Array<number> {
        return ChartUtils.getCategoryPointsForBudgetItems(budgetItems, categories);
    }
}
