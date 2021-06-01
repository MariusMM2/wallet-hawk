import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-image-card-item',
    templateUrl: './image-card-item.component.html',
    styleUrls: ['./image-card-item.component.scss']
})
export class ImageCardItemComponent {

    @Input() title: string;
    @Input() description: string;
    @Input() selected: boolean = false;
    @Input() truncateDescription: boolean = false;

    @Output() edit = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();

    constructor() {
    }

    onEdit() {
        this.edit.emit();
    }

    onDelete() {
        this.delete.emit();
    }
}
