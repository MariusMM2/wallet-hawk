import {Component, Input} from '@angular/core';

/**
 * Angular Component that handles a submit type of button,
 * with animations for submitting, and another input parameter
 * to manually disable the button.
 *
 * @param {boolean} disabled Should the button be disabled
 * @param {boolean} isSubmitting Should the button be disabled and show a loading animation
 */
@Component({
    selector: 'app-submit-button',
    templateUrl: './submit-button.component.html',
    styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent {
    @Input() disabled: boolean = false;
    @Input() isSubmitting: boolean;
}
