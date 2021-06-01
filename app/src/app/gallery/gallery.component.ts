import {Component, OnDestroy, OnInit} from '@angular/core';
import {BudgetItem, Gallery, Receipt} from '../core/models';
import {Observable, Subscription} from 'rxjs';
import {StoreService} from '../core/services/store.service';
import {MatDialog} from '@angular/material/dialog';
import {DataActionsService} from '../core/services/data-actions.service';
import {GalleryModalComponent} from './components/gallery-modal/gallery-modal.component';
import {ConfirmationModalComponent} from '../shared/components/confirmation-modal/confirmation-modal.component';
import {ReceiptModalComponent} from './components/receipt-modal/receipt-modal.component';

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
    receiptList$: Observable<Array<Receipt>>;

    selectedGallery: Gallery | null = null;
    selectedReceipt: Receipt | null = null;
    receiptBudgetItems: Array<BudgetItem> | null = null;

    private readonly _subscriptions = new Array<Subscription>();

    constructor(private store: StoreService,
                private dialog: MatDialog,
                private actions: DataActionsService) {
    }

    ngOnInit(): void {
        this.galleryList$ = this.store.select(state => state.data.galleryList);
        this.receiptList$ = this.store.select(state => state.data.receiptList);

        const receiptListSubscription = this.receiptList$.subscribe(receiptList => {
            if (receiptList) {
                this.selectedReceipt = receiptList.find(receipt => receipt.id === this.selectedReceipt?.id) ?? null;
            }
        });

        this._subscriptions.push(receiptListSubscription);
    }

    ngOnDestroy() {
        for (const subscription of this._subscriptions) {
            subscription.unsubscribe();
        }
    }

    onGallerySelect(gallery: Gallery): void {
        this.selectedGallery = gallery;
        this.selectedReceipt = null;
        this.receiptBudgetItems = null;
    }

    onReceiptSelect(receipt: Receipt): void {
        this.selectedReceipt = receipt;

        const receiptBudgetItemIds = receipt.budgetItemIds;
        this.receiptBudgetItems = this.store.getState(state => state.data.budgetItemList).filter(budgetItem => {
            return receiptBudgetItemIds.includes(budgetItem.id);
        });
    }

    addGallery() {
        this.dialog.open(GalleryModalComponent, {
            width: '400px',
            disableClose: true,
            autoFocus: true
        });
    }

    onGalleryEdit(gallery: Gallery) {
        this.dialog.open(GalleryModalComponent, {
            width: '400px',
            disableClose: true,
            autoFocus: true,
            data: gallery
        });
    }

    async onGalleryDelete(gallery: Gallery) {
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            autoFocus: true,
            data: {
                title: 'Deleting Gallery',
                message: `Are you sure you want to delete '${gallery.name ?? 'No title'}'?`,
            }
        });

        const confirmed = await dialogRef.afterClosed().toPromise();

        if (confirmed) {
            await this.actions.deleteGallery(gallery);
        }
    }

    addReceipt() {
        this.dialog.open(ReceiptModalComponent, {
            disableClose: true,
            autoFocus: true,
            data: {
                galleryId: this.selectedGallery?.id
            }
        });
    }

    async onReceiptDelete(receipt: Receipt) {
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            autoFocus: true,
            data: {
                title: 'Deleting Receipt',
                message: `Are you sure you want to delete '${receipt.date ?? 'No date'}', and its associated budget items?`,
            }
        });

        const confirmed = await dialogRef.afterClosed().toPromise();

        if (confirmed) {
            await this.actions.deleteReceipt(receipt);
        }
    }

    trackItems(_index: number, item: Gallery) {
        if (!item) {
            return null;
        }

        return item.id;
    }
}
