import {Pipe, PipeTransform} from '@angular/core';
import {BudgetItem, Category} from '../../core/models';
import ChartUtils from '../utilities/chart.utils';

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
