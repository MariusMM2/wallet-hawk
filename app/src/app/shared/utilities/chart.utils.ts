import {BudgetItem, Category} from '../../core/models';

export interface Dataset {
    label?: string;
    backgroundColor?: string;
    borderColor?: string,
    data: Array<number>;
}

export default class ChartUtils {

    /**
     * TODO find colors
     * Colors months on the graph based on how many of them are there.
     */
    static readonly monthColor: Array<string> = [
        'rgb(255, 99, 132)',
        'rgb(255, 144, 32)',
        'rgb(255, 194, 52)',
        'rgb(37, 206, 206)',
        'rgb(13, 156, 252)',
        'rgb(129, 67, 255)',
        'rgb(181, 185, 192)',
        '#4dc9f6',
        '#f67019',
        '#f53794',
        '#537bc4',
        '#acc236'
    ];

    /**
     * TODO find colors
     * Colors categories on the graph based on how many of them are there.
     */
    static readonly categoryColor = ChartUtils.monthColor;

    /**
     * Returns data points for a graph from a given array of budget items.
     * @param budgetItems
     * @param fillMissingWithZero whether or not missing sums in the month should be filled with '0'
     * @param daysCount
     */
    static getDataPointsForBudgetItems(budgetItems: Array<BudgetItem>, fillMissingWithZero: boolean, daysCount: number): Array<number> {
        const sumPerDayOfMonth = new Array<number>(daysCount);
        if (fillMissingWithZero) {
            sumPerDayOfMonth.fill(0);
        } else {
            sumPerDayOfMonth.fill(NaN);
        }

        for (const budgetItem of budgetItems) {
            const date = budgetItem.date;

            // checks if the sum for this item's month is NaNs and resets it to '0'
            // equivalent of 'NaN !== NaN', which is always true
            if (sumPerDayOfMonth[date.getDate() - 1] !== sumPerDayOfMonth[date.getDate() - 1]) {
                sumPerDayOfMonth[date.getDate() - 1] = 0;
            }

            sumPerDayOfMonth[date.getDate() - 1] += budgetItem.totalPrice / 100;
        }

        if (!fillMissingWithZero) {
            // finds the last sum in the array that is not NaN, i.e. a budget item contributed to that sum
            // and replaces all NaN sums until that sum with 0, to maintain a continuous graph line
            for (let i = sumPerDayOfMonth.length - 1; i >= 0; i--) {
                if (sumPerDayOfMonth[i] === sumPerDayOfMonth[i]) {
                    for (let j = 0; j < i; j++) {
                        if (sumPerDayOfMonth[j] !== sumPerDayOfMonth[j]) {
                            sumPerDayOfMonth[j] = 0;
                        }
                    }
                    break;
                }
            }
        }

        return sumPerDayOfMonth;
    }

    /**
     * Returns category-oriented data points for a given list of budget items.
     * @param budgetItems
     * @param categories
     */
    static getCategoryPointsForBudgetItems(budgetItems: Array<BudgetItem>, categories: Array<Category>): Array<number> {
        const sumPerCategory = new Array<number>();

        for (let category of categories) {
            const categoryItems = budgetItems.filter(budgetItem => budgetItem.categoryList.includes(category));

            const categoryTotal = categoryItems.reduce((previousTotal, currentItem) => {
                return previousTotal + currentItem.totalPrice / 100;
            }, 0);

            sumPerCategory.push(Math.abs(categoryTotal));
        }

        return sumPerCategory;
    }
}
