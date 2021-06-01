import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {paramCase} from 'change-case';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

    @Input() listItemType: 'BudgetItem' | 'ImageCard' = 'BudgetItem';

    @Input() title: string;
    @Input() readOnly: boolean = false;

    @Output() add = new EventEmitter<void>();

    constructor(private element: ElementRef) {
    }

    ngOnInit() {
        const widthClass = paramCase(this.listItemType);
        this.element.nativeElement.classList.add(widthClass);
    }

    onAdd($event: Event) {
        $event.preventDefault();
        this.add.emit();
    }
}
