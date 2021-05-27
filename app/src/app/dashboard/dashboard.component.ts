import {Component, OnInit} from '@angular/core';
import {BudgetItem} from '../core/models/budgetItem';
import {ObservableStore} from '../shared/utilities/redux.utils';
import {CoreState} from '../core/core.store';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * Angular Component that manages budget overviews.
 */
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    budgetItems$: Observable<BudgetItem[]>;

    constructor(private store: ObservableStore<CoreState>) {
    }

    ngOnInit(): void {
        const receiptBudgetItems = this.store.select(state => state.data.budgetItemList);
        const userBudgetItems = this.store.select(state => state.data.user.budgetItemList);
        this.budgetItems$ = combineLatest([receiptBudgetItems, userBudgetItems])
            .pipe(
                map(([receiptItems, userItems]) => {
                    if (receiptItems === null || userItems === null) {
                        return null;
                    }
                    return [
                        ...(receiptItems),
                        ...(userItems)
                    ];
                }));
    }

    trackItems(_index: number, item: BudgetItem) {
        if (!item) {
            return null;
        }

        return item.id;
    }
}
