import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BudgetItem, Receipt} from '../../../core/models';

@Component({
    selector: 'app-receipt-preview',
    templateUrl: './receipt-preview.component.html',
    styleUrls: ['./receipt-preview.component.scss']
})
export class ReceiptPreviewComponent implements OnChanges {

    @Input() receipt: Receipt | null;
    @Input() budgetItems: Array<BudgetItem> | null;

    ngOnChanges(changes: SimpleChanges): void {
        console.log(this.receipt);
    }
}
