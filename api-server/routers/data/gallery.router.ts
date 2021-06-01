import Router from 'express';
import {BudgetItemDAO, GalleryDAO, ReceiptDAO, UserDAO} from '../../database';
import {RequestCreator} from '../../types/request';

export const galleryRouter = Router();

/**
 * Retrieves all galleries, receipts and their respective budget items that belong to a user.
 */
galleryRouter.get('/',
    async (req: RequestCreator, res) => {
        const user = req.creator as UserDAO;

        let galleries: Array<GalleryDAO>;
        try {
            galleries = await user.getGalleries();
        } catch (e) {
            console.log(`Unable to retrieve galleries for user ${user.id}: `, e);
            return res.sendStatus(500);
        }

        const receipts = new Array<ReceiptDAO>();
        for (const gallery of galleries) {
            let galleryReceipts: Array<ReceiptDAO>;
            try {
                galleryReceipts = await gallery.getReceipts();
            } catch (e) {
                console.log(`Unable to retrieve receipts for gallery ${gallery.id}`, e);
                continue;
            }

            receipts.push(...galleryReceipts);
        }

        const budgetItems = new Array<BudgetItemDAO>();
        for (const receipt of receipts) {
            let receiptBudgetItems: Array<BudgetItemDAO>;
            try {
                receiptBudgetItems = await receipt.getBudgetItems();
            } catch (e) {
                console.log(`Unable to retrieve budget items for receipt ${receipt.id}`, e);
                continue;
            }

            budgetItems.push(...receiptBudgetItems);
        }

        res.json({
            galleryList: galleries,
            receiptList: receipts,
            budgetItemList: budgetItems
        });
    });
