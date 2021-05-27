import {BudgetItem} from '../../core/models/budgetItem';
import {Category} from '../../core/models/category';

export type DateMonth =
    'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';

export interface Dataset {
    label: string;
    backgroundColor?: string;
    borderColor?: string,
    data: Array<number>;
}

export default class ChartUtils {
    /**
     * Labels for each month.
     */
    static readonly monthLabels: Array<DateMonth> = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

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

    static readonly daysPerMonth = 31;

    /**
     * Returns the labels for the days of a month. Currently only returns their number.
     */
    static getDayLabels(): Array<string> {
        const days = new Array<string>();

        for (let i = 0; i < this.daysPerMonth; i++) {
            days.push(`${i + 1}`);
        }

        return days;
    }

    /**
     * Returns the month of the current date.
     */
    static getCurrentMonth(): DateMonth {
        const currentDate = new Date();
        return this.monthLabels[currentDate.getMonth()] as DateMonth;
    }

    /**
     * Returns data points for a graph from a given array of budget items.
     * @param budgetItems
     */
    static getDataPointsForBudgetItems(budgetItems: Array<BudgetItem>): Array<number> {
        const sumPerDayOfMonth = new Array<number>(31);
        sumPerDayOfMonth.fill(0);

        for (const budgetItem of budgetItems) {
            const date = budgetItem.date;
            sumPerDayOfMonth[date.getDate()] += budgetItem.totalPrice;
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
            console.log(categoryItems);

            const categoryTotal = categoryItems.reduce((previousTotal, currentItem) => {
                return previousTotal + currentItem.totalPrice;
            }, 0);

            console.log(categoryTotal);

            sumPerCategory.push(categoryTotal);
        }

        return sumPerCategory;
    }
}
