import {ValidationError} from '../types/validationError';
import {capitalCase} from 'change-case';

/**
 * Accepts an array of 'ValidationError's and converts them
 * to a more user readable form.
 *
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
export function parseErrorArray(errors: Array<ValidationError>): Array<String> {
    const formattedErrors = new Array<String>();
    for (const error of errors) {
        const fieldName = capitalCase(error.param);
        formattedErrors.push(['The', fieldName, error.msg + '.'].join(' '));
    }

    return formattedErrors;
}
