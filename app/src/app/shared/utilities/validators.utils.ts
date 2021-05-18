import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Custom validator to check that two fields match.
 * @param firstControlName
 * @param secondControlName
 * @returns ValidatorFn Validator used by form controls
 */
export function mustMatch(firstControlName: string, secondControlName: string): ValidatorFn {
    return function(control: AbstractControl): ValidationErrors | null {
        const firstControl = control.get(firstControlName);
        const secondControl = control.get(secondControlName);

        if (firstControl.errors && !firstControl.hasError('mustMatch') ||
            secondControl.errors && !secondControl.hasError('mustMatch')) {
            return null;
        }

        if (firstControl && secondControl && firstControl.value !== secondControl.value) {
            firstControl.setErrors({mustMatch: true});
            secondControl.setErrors({mustMatch: true});
            return {mustMatch: true};
        }

        firstControl.setErrors(null);
        secondControl.setErrors(null);
        return null;
    };
}

/**
 * TODO implement
 * Custom validator that checks with the server to ensure
 * an email is not already in use.
 * @param control
 */
export async function emailAvailable(control: AbstractControl): Promise<ValidationErrors | null> {
    if (control.errors && !control.errors.mustMatch) {
        return null;
    }

    return null;
}
