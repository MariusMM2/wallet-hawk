import {Component, OnInit} from '@angular/core';
import {BudgetItem, Category} from '../core/models';
import {StoreService} from '../core/services/store.service';
import {combineLatest, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {DateUtils} from '../shared/utilities/date.utils';
import {BudgetItemModalComponent} from './components/budget-item-add-modal/budget-item-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogBudgetItemData, OkDialogData} from './types/dialogData';
import {ConfirmationModalComponent} from '../shared/components/confirmation-modal/confirmation-modal.component';
import {DataActionsService} from '../core/services/data-actions.service';
import {OkModalComponent} from '../shared/components/ok-modal/ok-modal.component';

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

    constructor(private store: StoreService,
                private dialog: MatDialog,
                private actions: DataActionsService) {
    }

    ngOnInit(): void {
        const mapCreatorToItems = (creatorType) => {
            return map((budgetItemList: Array<BudgetItem>) => {
                if (!budgetItemList) {
                    return budgetItemList;
                }
                return budgetItemList.map(budgetItem => {
                    return {
                        ...budgetItem,
                        creatorType: creatorType
                    } as BudgetItem;
                });
            });
        };

        const receiptBudgetItems = this.store.select(state => state.data.budgetItemList)
            .pipe(mapCreatorToItems('receipt'));
        const userBudgetItems = this.store.select(state => state.data.user.budgetItemList)
            .pipe(mapCreatorToItems('user'));
        this.budgetItems$ = combineLatest([receiptBudgetItems, userBudgetItems])
            .pipe(
                filter(([receiptItems, userItems]) => !!receiptItems && !!userItems),
                map(([receiptItems, userItems]) => [...(receiptItems), ...(userItems)])
            );

        this.categories$ = this.store.select(state => state.data.categoryList);
    }

    trackItems(_index: number, item: BudgetItem) {
        if (!item) {
            return null;
        }

        return item.id;
    }

    addBudgetItem() {
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
                budgetItem,
                allCategories: this.store.getState(state => state.data.categoryList),
            } as DialogBudgetItemData
        });
    }

    async onBudgetItemDelete(budgetItem: BudgetItem) {
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            autoFocus: true,
            data: {
                title: 'Deleting Budget Item',
                message: `Are you sure you want to delete '${budgetItem.name ?? 'No title'}'?`,
            }
        });

        const confirmed = await dialogRef.afterClosed().toPromise();

        if (confirmed) {
            await this.actions.deleteUserBudgetItem(budgetItem.id);
        }
    }

    openEntriesInfoModal() {
        this.dialog.open(OkModalComponent, {
            autoFocus: true,
            data: {
                message: 'Budget items added automatically by receipts cannot be deleted here. If needed, visit the Gallery page and remove the corresponding receipt from there.'
            } as OkDialogData
        });
    }
}
