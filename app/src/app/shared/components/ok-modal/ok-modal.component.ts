import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OkDialogData} from '../../../dashboard/types/dialogData';

@Component({
    selector: 'app-ok-modal',
    templateUrl: './ok-modal.component.html',
    styleUrls: ['./ok-modal.component.scss']
})
export class OkModalComponent {

    constructor(private dialogRef: MatDialogRef<OkModalComponent>,
                @Inject(MAT_DIALOG_DATA) public content: OkDialogData) {
    }

    onClose() {
        this.dialogRef.close();
    }
}
