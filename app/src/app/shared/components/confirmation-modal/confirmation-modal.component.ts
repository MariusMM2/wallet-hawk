import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfirmationDialogData} from '../../../dashboard/types/dialogData';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

    constructor(private dialogRef: MatDialogRef<ConfirmationModalComponent>,
                @Inject(MAT_DIALOG_DATA) public content: ConfirmationDialogData) {
    }

    onCancel() {
        this.dialogRef.close(false);
    }

    onConfirm() {
        this.dialogRef.close(true);
    }
}
