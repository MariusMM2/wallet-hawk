/**
 * This file contains various middleware functions
 * related to input validation and sanitization.
 */
import {check, CustomValidator, Meta, ValidationChain, validationResult} from 'express-validator';
import {
    dateFormat,
    emailMaximumLength,
    emailMinimumLength,
    emailRegExp,
    locale,
    passwordMaximumLength,
    passwordMinimumLength,
    passwordRegExp
} from '../app.config';
import {MinMaxOptions} from 'express-validator/src/options';
import {NextFunction, Request, Response} from 'express';

const encodableHtmlChars: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#x27;',
};

/**
 * Function that returns a {@link ValidationChain} used to
 * ensure the 'field' attribute in the request object
 * exists if it is not optional.
 * @param {string} field - Attribute to be validated
 * @param {boolean} optional - Whether or not the field must be present
 * @returns {ValidationChain} - the current Validation chain instance
 */
export function parseField(field: string | undefined, optional: boolean) {
    const parser = check(field);
    return optional ?
        // only run parsing if field is provided
        parser.if(check(field).exists()) :
        // ensure field is provided
        parser.exists().withMessage('must be provided').bail();
}

/**
 * Function that returns a {@link ValidationChain} used to
 * ensure the 'field' attribute in the request object
 * is a valid UUID string.
 * @param {string} field - Attribute to be validated, defaults to 'id'
 * @param {boolean} optional - Whether or not the field is optional, defaults to 'false'
 * @returns {ValidationChain} - the current Validation chain instance
 */
export function parseUUID(field: string = 'id', optional: boolean = false) {
    return parseField(field, optional)
        // Validation
        // check if is a valid UUID string
        .isUUID().withMessage('must be a valid UUID string').bail();
    // Sanitization
    // none
}

/**
 * Function that returns a {@link ValidationChain} used to
 * ensure the 'field' attribute in the given request object
 * is a valid string that matches given boundaries. The field is then
 * trimmed of whitespaces.
 * @param {string} field - Attribute to be validated
 * @param {Object} options - Object of 'min' and 'max' to set the length of the string
 * @param {boolean} optional - Whether or not the field must be present, defaults to 'false'
 * @returns {ValidationChain} - the current Validation chain instance
 */
export function parseString(field: string | undefined, options: MinMaxOptions, optional: boolean = false) {
    return parseField(field, optional)
        // Validation
        // check if length matches
        .isLength(options).withMessage(`must be between ${options.min} and ${options.max} characters`).bail()
        // ensure field is not empty, outside of whitespaces
        .not().isEmpty({ignore_whitespace: true}).withMessage('cannot be empty').bail()
        // Sanitization
        // trim leading and trailing whitespaces
        .trim()
        // encode HTML sensitive characters inside the string
        .customSanitizer(encodeHtml);
}

/**
 * TODO revisit
 * Function that returns a {@link ValidationChain} used to
 * ensure the 'field' attribute in the given request object
 * is a valid number. The field is then
 * cast to a float.
 * @param {string} field - Attribute to be validated
 * @param {boolean} optional - Whether or not the field is optional, defaults to 'false'
 * @returns {ValidationChain} - the current Validation chain instance
 */
export function parseDecimal(field: string | undefined, optional = false) {
    return parseField(field, optional)
        // Validation
        // check if the number format matches
        .isFloat().withMessage('must be a valid float').bail()
        // Sanitization
        .toFloat();
}

/**
 * Function that returns a {@link ValidationChain} used to
 * ensure the 'field' attribute in the given request object
 * is a valid date. The field is then
 * cast to a JavaScript {@link Date}.
 * @param {string} field - Attribute to be validated
 * @param {boolean} optional - Whether or not the field is optional, defaults to 'false'
 * @returns {ValidationChain} - the current Validation chain instance
 */
export function parseDate(field: string | undefined, optional = false) {
    return parseField(field, optional)
        // Validation
        // check if format matches
        // TODO check here if date validation fails
        // .custom(value => {
        //     const date = Date.parse(value);
        //     if (date !== date) { // NaN !== NaN
        //         throw new Error('must be a valid date');
        //     } else {
        //         return true;
        //     }
        // }).bail()
        .isDate({
            format: dateFormat
        }).withMessage('must be a valid date').bail()
        // Sanitization
        .toDate();
}

/**
 * Function that returns a {@link ValidationChain} used to
 * ensure the 'field' attribute in the given request object
 * is a valid URL.
 * @param {string} field - Attribute to be validated
 * @param {boolean} optional - Whether or not the field is optional, defaults to 'false'
 * @returns {ValidationChain} - the current Validation chain instance
 */
export function parseUrl(field: string | undefined, optional = false) {
    return parseString(field, {min: 2, max: 2000})
        // Validation
        // check if valid URL
        .isURL().withMessage('must be a valid URL').bail();
    // Sanitization
    // none
}

/**
 * Function that returns a {@link ValidationChain} used to
 * ensure the 'field' attribute in the given request object
 * matches a given email RegExp.
 * @param {string} field - Attribute to be validated
 * @param {RegExp} pattern - RegExp to test against
 * @param {boolean} optional - Whether or not the field is optional, defaults to 'false'
 * @returns {ValidationChain} - the current Validation chain instance
 */
export function parseEmail(field = 'email', pattern: RegExp = emailRegExp, optional = false) {
    return parseString(field, {min: emailMinimumLength, max: emailMaximumLength}, optional)
        // Validation
        // TODO revisit pattern when a more uniform email validation is settled across the app and api
        .matches(pattern).withMessage('must be a valid address').bail();
    // Sanitization
    // none
}

/**
 * Function that returns a {@link ValidationChain} used to
 * ensure the 'field' attribute in the given request object
 * is a valid email string.
 * @param {string} field - Attribute to be validated
 * @param {boolean} optional - Whether or not the field is optional, defaults to 'false'
 * @returns {ValidationChain} - the current Validation chain instance
 */
export function parseBasicEmail(field = 'email', optional = false) {
    return parseString(field, {min: emailMinimumLength, max: emailMaximumLength}, optional);
    // Validation
    // none
    // Sanitization
    // none
}

/**
 * Function that returns a {@link ValidationChain} used to
 * ensure the 'field' attribute in the given request object
 * is a valid alphanumeric password.
 * @param {string} field - Attribute to be validated
 * @param {boolean} optional - Whether or not the field is optional, defaults to 'false'
 * @returns {ValidationChain} - the current Validation chain instance
 */
export function parseAlphanumericPassword(field = 'password', optional = false) {
    return parseString(field, {min: passwordMinimumLength, max: passwordMaximumLength}, optional)
        // Validation
        .isAlphanumeric(locale).withMessage('must only contain letters and numbers').bail();
    // Sanitization
    // none
}

/**
 * Function that returns a {@link ValidationChain} used to
 * ensure the 'field' attribute in the given request object
 * is a valid password string.
 * @param {string} field - Attribute to be validated
 * @param {boolean} optional - Whether or not the field is optional, defaults to 'false'
 * @returns {ValidationChain} - the current Validation chain instance
 */
export function parseBasicPassword(field = 'password', optional = false) {
    return parseString(field, {min: passwordMinimumLength, max: passwordMaximumLength}, optional);
    // Validation
    // none
    // Sanitization
    // none
}

/**
 * Function that returns a {@link ValidationChain} used to
 * ensure the 'field' attribute in the given request object
 * matches a given password RegExp.
 * @param {string} field - Attribute to be validated
 * @param {RegExp} pattern - RegExp to test against
 * @param {boolean} optional - Whether or not the field is optional, defaults to 'false'
 * @returns {ValidationChain} - the current Validation chain instance
 */
export function parsePassword(field = 'password', pattern: RegExp = passwordRegExp, optional = false) {
    return parseString(field, {min: passwordMinimumLength, max: passwordMaximumLength}, optional)
        // Validation
        // .isStrongPassword({
        //     minLength: passwordMinimumLength,
        //     minLowercase: 0,
        //     minUppercase: 0,
        //     minNumbers: 1,
        //     minSymbols: 1
        // }).withMessage('must contain at least a number and a special character').bail()
        .matches(pattern).withMessage('must contain letters, numbers and special characters').bail();
    // Sanitization
    // none
}

/**
 * Function that returns a {@link ValidationChain} used to
 * ensure the 'field' attribute in the given request object
 * is a valid alphanumeric password.
 * @param {string} field - Attribute to be validated
 * @param {boolean} optional - Whether or not the field is optional, defaults to 'false'
 * @returns {ValidationChain} - the current Validation chain instance
 */
export function parseName(field = 'password', optional = false) {
    return parseString(field, {min: 5, max: 50}, optional)
        // Validation
        .isAlpha(locale).withMessage('must only contain letters').bail();
    // Sanitization
    // none
}

/**
 * Function that takes a string and
 * replaces HTML sensitive characters
 * with their encoded versions, as can be seen in {@link encodableHtmlChars}.
 * @param {string} input - Value to be sanitized
 * @returns {ValidationChain} - the current Validation chain instance
 */
export function encodeHtml(input: string) {
    return [...input].map(char => {
        return encodableHtmlChars[char] ? encodableHtmlChars[char] : char;
    }).join('');
}

/**
 * Router-level middleware function that check for input validation
 * errors in the request body/params.
 * @param {Request} req - The Request object
 * @param {Response} res - The Response object
 * @param {NextFunction} next - The middleware function callback argument
 */
export function inputValidator(req: Request, res: Response, next: NextFunction) {
    // check if errors have been generated during field validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // errors have been generated, send them in the response body
        res.status(400).json({errors: errors.array()});
    } else {
        // no errors, go to the next middleware
        next();
    }
}

/**
 * Checks if the id is the one of the currently authenticated user.
 * @param id - Id to be checked
 * @param req - The Request object
 * @returns {Error|boolean} True if the id matches the current user, throws Error otherwise
 */
export function isCurrentUser(id: any, {req}: Meta) {
    console.log(id);
    console.log(req.session.userId);
    if (id === req.session?.userId) {
        return true;
    } else {
        throw new Error('must be the id of the user making the request');
    }
}

/**
 * Checks if the Date is after the provided Date.
 * @param {string} otherDateField - Provided Date attribute to check against
 * @returns {CustomValidator} True if the Date is after the provided Date, throws Error otherwise
 */
export function isAfter(otherDateField: string): CustomValidator {
    return (thisDate, {req}) => {
        const otherDate = req.body[otherDateField];
        if (Date.parse(thisDate) < Date.parse(otherDate)) {
            throw new Error(`must be after ${otherDateField}`);
        } else {
            return true;
        }
    };
}
