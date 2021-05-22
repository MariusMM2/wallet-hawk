import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {dateFormat} from 'src/app/app.config';
import {BudgetItem} from '../../../core/models/budgetItem';

@Component({
    selector: 'app-budget-item',
    templateUrl: './budget-item.component.html',
    styleUrls: ['./budget-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetItemComponent {
    @Input() item: BudgetItem;

    @Output() menuClicked = new EventEmitter<string>();

    readonly dateFormat = dateFormat;
}
