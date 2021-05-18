import * as stringUtils from './string.utils';
import {ValidationError} from '../types/validationError';

describe('StringUtils', () => {

    beforeEach(() => {
    });

    it('should be parsed if valid', () => {
        const input: Array<ValidationError> = [
            {
                value: 'foo111bar',
                msg: 'must contain letters, numbers and special characters',
                param: 'password',
                location: 'body'
            },
        ];
        const output: Array<String> = [
            'The Password must contain letters, numbers and special characters.'
        ];

        expect(stringUtils.parseErrorArray(input)).toEqual(output);
    });
});
