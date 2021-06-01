import {BudgetItem} from '../../core/models';

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

export class DateUtils {

    /**
     * Names for each month.
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
     * Returns the index of the month of the current time.
     */
    static getCurrentMonthIndex(): number {
        const currentDate = new Date();
        return currentDate.getMonth();
    }

    /**
     * Returns the month of the current time.
     */
    static getCurrentMonth(): DateMonth {
        return DateUtils.monthLabels[this.getCurrentMonthIndex()] as DateMonth;
    }

    /**
     * Returns the date of month of the current time.
     */
    static getDateOfCurrentMonth(): number {
        const currentDate = new Date();
        return currentDate.getDate();
    }

    static getDateCountOfCurrentMonth(): number {
        const currentDate = new Date();
        return this.getDateCountOfMonth(currentDate.getMonth(), currentDate.getFullYear());
    }

    static getDateCountOfMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    /**
     * Returns the year of the current time.
     */
    static getCurrentYear(): number {
        const currentDate = new Date();
        return currentDate.getFullYear();
    }

    /**
     * Returns the previous year relative to the current time.
     */
    static getPreviousYear(): number {
        return this.getCurrentYear() - 1;
    }

    static filterBudgetItems(budgetItems: Array<BudgetItem>, startDate: Date, endDate: Date): Array<BudgetItem> {
        return budgetItems.filter(budgetItem => {
            return budgetItem.date >= startDate &&
                budgetItem.date < endDate;
        });
    }
}
