import {BudgetItem, Category} from '../../core/models';

export class ModelUtils {
    static parseBudgetItemCategories(budgetItems: BudgetItem | Array<BudgetItem>, categories: Array<Category>): void {
        if (!Array.isArray(budgetItems)) {
            budgetItems = [budgetItems];
        }

        for (let budgetItem of budgetItems) {
            if (!budgetItem.categoryIds) {
                continue;
            }
            budgetItem.categoryList = categories.filter(category => {
                return budgetItem.categoryIds.some(categoryId => categoryId === category.id);
            });

            delete budgetItem.categoryIds;
        }
    }

    static parseBudgetItemDates(budgetItems: BudgetItem | Array<BudgetItem>): void {
        if (!Array.isArray(budgetItems)) {
            budgetItems = [budgetItems];
        }

        for (const budgetItem of budgetItems) {
            budgetItem.date = new Date(budgetItem.date);
        }
    }
}
