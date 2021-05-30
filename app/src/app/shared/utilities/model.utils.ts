import {BudgetItem} from '../../core/models/budgetItem';
import {Category} from '../../core/models/category';

export class ModelUtils {
    static parseBudgetItemCategories(budgetItems: BudgetItem | Array<BudgetItem>, categories: Array<Category>): void {
        if (!Array.isArray(budgetItems)) {
            budgetItems = [budgetItems];
        }

        for (let budgetItem of budgetItems) {
            budgetItem.categoryList = categories.filter(category => {
                return budgetItem.categoryIds.some(categoryId => categoryId === category.id);
            });

            delete budgetItem.categoryIds;
        }
    }
}
