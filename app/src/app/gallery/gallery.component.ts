import {Component, OnDestroy, OnInit} from '@angular/core';
import {BudgetItem, Gallery, Receipt} from '../core/models';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {StoreService} from '../core/services/store.service';
import {MatDialog} from '@angular/material/dialog';
import {DataActionsService} from '../core/services/data-actions.service';

/**
 * Angular Component that manages receipt galleries.
 */
@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

    galleryList$: Observable<Array<Gallery>>;
    selectedGallery$: BehaviorSubject<Gallery | null> = new BehaviorSubject<Gallery | null>(null);

    galleryReceipts: Array<Receipt> | null;
    selectedReceipt$: BehaviorSubject<Receipt | null> = new BehaviorSubject<Receipt | null>(null);

    receiptBudgetItems: Array<BudgetItem> | null;

    private _subscriptions: Array<Subscription> = new Array<Subscription>();

    constructor(private store: StoreService,
                private dialog: MatDialog,
                private actions: DataActionsService) {
    }

    ngOnInit(): void {
        this.galleryList$ = this.store.select(state => state.data.galleryList);
        const selectedGallerySubscription = this.selectedGallery$.subscribe(gallery => {
            this.selectedReceipt$.next(null);
            if (gallery === null) {
                this.galleryReceipts = null;
            } else {
                this.galleryReceipts = this.store.getState(state => state.data.receiptList).filter(receipt => {
                    return receipt.galleryId === gallery.id;
                });
            }
        });
        this._subscriptions.push(selectedGallerySubscription);

        const selectedReceiptSubscription = this.selectedReceipt$.subscribe(receipt => {
            if (receipt === null) {
                this.receiptBudgetItems = null;
            } else {
                const receiptBudgetItemIds = receipt.budgetItemIds;
                this.receiptBudgetItems = this.store.getState(state => state.data.budgetItemList).filter(budgetItem => {
                    return receiptBudgetItemIds.includes(budgetItem.id);
                });
            }
        });
        this._subscriptions.push(selectedReceiptSubscription);
    }

    ngOnDestroy(): void {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    trackItems(_index: number, item: Gallery) {
        if (!item) {
            return null;
        }

        return item.id;
    }

    addGalleryItem() {

    }
}
