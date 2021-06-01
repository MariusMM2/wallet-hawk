import {ValidationError} from '../types/validationError';
import {capitalCase} from 'change-case';

export default class StringUtils {
    // Canvas used by getTextWidth to calculate the width of a given text
    private static canvasElement: HTMLCanvasElement;

    /**
     * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
     *
     * @param {String} text The text to be rendered.
     * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana"). Defaults to '500 12px Roboto'
     *
     * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
     */
    static getTextWidth(text: string, font: string = '500 12px Roboto'): number {
        // Re-uses canvas object for better performance
        const canvasElement = this.canvasElement ?? (this.canvasElement = document.createElement('canvas'));
        const renderingContext2D = canvasElement.getContext('2d');
        renderingContext2D.font = font;
        const textMetrics = renderingContext2D.measureText(text);

        return textMetrics.width;
    }

    /**
     * Accepts an array of 'ValidationError's and converts them
     * to a more user readable form.
     * e.g.
     * ```
     * [
     *   {
     *     value: 'foo111bar',
     *     msg: 'must contain letters, numbers and special characters',
     *     param: 'password',
     *     location: 'body'
     *   },
     * ]
     * ```
     * is converted to
     * ```
     * 'The Password must contain letters, numbers and special characters.'
     * ```
     * @param {Array<ValidationError>} errors Errors to convert
     * @returns {Array<String>} Array of readable errors
     */
    static parseErrorArray(errors: Array<ValidationError>): Array<String> {
        const formattedErrors = new Array<String>();
        for (const error of errors) {
            const fieldName = capitalCase(error.param);
            formattedErrors.push(['The', fieldName, error.msg + '.'].join(' '));
        }

        return formattedErrors;
    }
}
