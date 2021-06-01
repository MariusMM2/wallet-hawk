import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataActionsService} from '../../../core/services/data-actions.service';
import {StoreService} from '../../../core/services/store.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogGalleryData} from '../../../dashboard/types/dialogData';

@Component({
    templateUrl: './gallery-modal.component.html',
    styleUrls: ['./gallery-modal.component.scss']
})
export class GalleryModalComponent implements OnInit {

    galleryForm: FormGroup;

    isLoading = false;

    constructor(private formBuilder: FormBuilder,
                private actions: DataActionsService,
                private store: StoreService,
                private dialogRef: MatDialogRef<GalleryModalComponent>,
                @Inject(MAT_DIALOG_DATA) public gallery: DialogGalleryData) {
    }

    ngOnInit(): void {
        this.galleryForm = this.formBuilder.group({
            name: [this.gallery?.name ?? ''],
            description: [this.gallery?.description ?? '']
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    async onSubmit(event: Event): Promise<void> {
        event.preventDefault();
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;
        if (this.galleryForm.valid) {
            const gallery: DialogGalleryData = {...this.gallery, ...this.galleryForm.value};

            gallery.name = gallery.name.trim();
            gallery.description = gallery.description.trim();

            const result = await this.actions.upsertGallery(gallery);
            if (result) {
                this.dialogRef.close();
            }
        }

        this.isLoading = false;
    }
}
