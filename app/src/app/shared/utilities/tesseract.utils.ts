import {BudgetItem} from '../../core/models';

export type OCRPreset = 'Fotex';

type ParseState =
    'search-title'
    | 'found-title-price'
    | 'search-sale-price'
    | 'found-sale-price'
    | 'found-title-only'
    | 'search-item-quantity'
    | 'found-item-quantity'
    | 'done';


export class TesseractUtils {

    private static readonly sectionRegex = /.*[*=~][\w &.]+[*=~].*/gm;
    private static readonly headerRegex = /.*\w{3} - \w{3} \d{2}\.\d{2} - \d{2}\.\d{2}.*\n/;
    private static readonly footerRegex = /.*TOTAL [\s\S]*/;
    private static readonly whiteSpaceRegex = /  +/g;
    private static readonly newLineRegex = /\n\n+/g;

    private static readonly endingPriceRegex = /([\d]+[.,][\d]{2})$/;
    private static readonly endingSalePriceRegex = /([\d]+[.,][\d]{2})-$/;

    public static getBudgetItems(tesseractData: string): Array<Partial<BudgetItem>> {
        tesseractData = this.stripUnusedLines(tesseractData);
        return this.parseBudgetItemsList(tesseractData);
    }

    /**
     * @private
     * @param tesseractData
     */
    static removeSections(tesseractData: string): string {
        return tesseractData.replace(this.sectionRegex, '').trim();
    }

    /**
     * @private
     * @param tesseractData
     */
    static removeHeader(tesseractData: string): string {
        return tesseractData.replace(this.headerRegex, '').trim();
    }

    /**
     * @private
     * @param tesseractData
     */
    static removeFooter(tesseractData: string): string {
        return tesseractData.replace(this.footerRegex, '').trim();
    }

    /**
     * @private
     * @param tesseractData
     */
    static trimExtraWhitespace(tesseractData: string): string {
        return tesseractData.trim().replace(this.whiteSpaceRegex, ' ').replace(this.newLineRegex, '\n');
    }

    /**
     * @private
     * @param tesseractData
     * @param preset
     */
    static stripUnusedLines(tesseractData: string, preset: OCRPreset = 'Fotex'): string {
        if (preset === 'Fotex') {
            tesseractData = this.removeSections(tesseractData);
            tesseractData = this.removeHeader(tesseractData);
            tesseractData = this.removeFooter(tesseractData);
            tesseractData = this.trimExtraWhitespace(tesseractData);
        }

        return tesseractData;
    }

    /**
     * @private
     * @param tesseractData
     * @param preset
     */
    static parseBudgetItemsList(tesseractData: string, preset: OCRPreset = 'Fotex'): Array<Partial<BudgetItem>> {
        const dataLines = tesseractData.split('\n');

        const budgetItems = new Array<Partial<BudgetItem>>();
        let index = 0;
        let currentItem: Partial<BudgetItem> = budgetItems[index] = {};

        let state: ParseState = 'search-title';
        let dataLine: string = dataLines.shift();

        const nextItem = () => {
            currentItem.totalPrice = -currentItem.totalPrice;
            if (dataLine) {
                index++;
                currentItem = budgetItems[index] = {};
            } else {
                state = 'done';
            }
        };

        // @ts-ignore
        while (state !== 'done') {
            if (!dataLine) {
                nextItem();
            }

            if (state === 'search-title') {
                if (this.endingPriceRegex.test(dataLine)) {
                    state = 'found-title-price';
                } else {
                    state = 'found-title-only';
                }
            } else if (state === 'found-title-price') {
                const titlePriceMatches = dataLine.match(this.endingPriceRegex);
                currentItem.name = dataLine.substring(0, titlePriceMatches.index).trim();
                currentItem.totalPrice = this.parsePrice(titlePriceMatches[0]);
                state = 'search-sale-price';
                dataLine = dataLines.shift();
            } else if (state === 'search-sale-price') {
                if (this.endingSalePriceRegex.test(dataLine)) {
                    state = 'found-sale-price';
                } else {
                    state = 'search-title';
                    nextItem();
                }
            } else if (state === 'found-sale-price') {
                const salePriceMatches = dataLine.match(this.endingSalePriceRegex);
                currentItem.totalPrice -= this.parsePrice(salePriceMatches[0]);
                dataLine = dataLines.shift();
                state = 'search-title';
                nextItem();
            } else if (state === 'found-title-only') {
                currentItem.name = dataLine;
                state = 'search-item-quantity';
                dataLine = dataLines.shift();
            } else if (state === 'search-item-quantity') {
                if (this.endingPriceRegex.test(dataLine)) {
                    state = 'found-item-quantity';
                } else {
                    currentItem.totalPrice = 0;
                    state = 'search-title';
                    nextItem();
                }
            } else if (state === 'found-item-quantity') {
                const priceMatches = dataLine.match(this.endingPriceRegex);
                currentItem.totalPrice = this.parsePrice(priceMatches[0]);
                dataLine = dataLines.shift();
                state = 'search-title';
                nextItem();
            }
        }

        return budgetItems;
    }

    private static parsePrice(price: string): number {
        return parseInt(price.replace(/\D/, ''));
    }
}
