import {Component, OnInit} from '@angular/core';
import {BudgetItem} from '../core/models/budgetItem';
import {ObservableStore} from '../shared/utilities/redux.utils';
import {CoreState} from '../core/core.store';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Category} from '../core/models/category';
import {DateUtils} from '../shared/utilities/date.utils';
import {BudgetItemModalComponent} from './components/budget-item-add-modal/budget-item-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogBudgetItemData} from './types/dialogData';
import {ConfirmationModalComponent} from '../shared/components/confirmation-modal/confirmation-modal.component';
import {DataActions} from '../core/actions/data.actions';

/**
 * Angular Component that manages budget overviews.
 */
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    budgetItems$: Observable<Array<BudgetItem>>;
    categories$: Observable<Array<Category>>;

    readonly currentMonth = DateUtils.getCurrentMonth();
    readonly daysCountOfCurrentMonth = DateUtils.getDateCountOfCurrentMonth();
    readonly previousYear = DateUtils.getPreviousYear();

    constructor(private store: ObservableStore<CoreState>,
                private dialog: MatDialog,
                private actions: DataActions) {
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

        this.categories$ = this.store.select(state => state.data.categoryList);
    }

    trackItems(_index: number, item: BudgetItem) {
        if (!item) {
            return null;
        }

        return item.id;
    }

    async addBudgetItem() {
        this.dialog.open(BudgetItemModalComponent, {
            disableClose: true,
            autoFocus: true,
            data: {
                allCategories: this.store.getState(state => state.data.categoryList),
            } as DialogBudgetItemData
        });
    }

    onBudgetItemEdit(budgetItem: BudgetItem) {
        this.dialog.open(BudgetItemModalComponent, {
            disableClose: true,
            autoFocus: true,
            data: {
                ...budgetItem,
                allCategories: this.store.getState(state => state.data.categoryList),
            } as DialogBudgetItemData
        });
    }

    async onBudgetItemDelete(budgetItem: BudgetItem) {
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            autoFocus: true,
            data: {
                title: 'Deleting Budget Item',
                message: `Are you sure you want to delete '${budgetItem.name || 'No title'}'?`,
            }
        });

        const confirmed = await dialogRef.afterClosed().toPromise();

        if (confirmed) {
            await this.actions.deleteUserBudgetItem(budgetItem);
        }
    }
}
