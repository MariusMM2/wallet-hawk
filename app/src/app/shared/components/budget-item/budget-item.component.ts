import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {BudgetItem} from '../../../core/models';

@Component({
    selector: 'app-budget-item',
    templateUrl: './budget-item.component.html',
    styleUrls: ['./budget-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetItemComponent {

    @Input() item: Partial<BudgetItem>;
    @Input() readOnly: boolean = false;

    @Output() edit = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();

    onEdit() {
        this.edit.emit();
    }

    onDelete() {
        this.delete.emit();
    }
}
