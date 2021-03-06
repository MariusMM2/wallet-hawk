import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {BudgetItem} from '../../../core/models';

@Component({
    selector: 'app-budget-item',
    templateUrl: './budget-item.component.html',
    styleUrls: ['./budget-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetItemComponent implements OnChanges {

    @Input() item: Partial<BudgetItem>;
    @Input() readOnly: boolean = false;

    @Output() edit = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();

    ngOnChanges(changes: SimpleChanges) {
        const newItem: Partial<BudgetItem> = changes['item']?.currentValue;

        if (newItem?.creatorType === 'receipt') {
            this.readOnly = true;
        }
    }

    onEdit() {
        this.edit.emit();
    }

    onDelete() {
        this.delete.emit();
    }
}
