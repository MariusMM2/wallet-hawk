import Router from 'express';
import {BudgetItemDAO, GalleryDAO, ReceiptDAO} from '../../database';
import {FullRequest, RequestCreator, RequestGallery} from '../../types/request';
import {notImplemented} from '../../middleware/auth';

export const galleryRouter = Router();

/**
 * Retrieves all galleries, receipts and their respective budget items that belong to a user.
 */
galleryRouter.get('/',
    async (req: RequestCreator, res) => {
        const user = req.user!;

        let galleries: Array<GalleryDAO>;
        try {
            galleries = await user.getGalleries();
        } catch (error) {
            console.log(`Unable to retrieve galleries for user ${user.id}: `, error);
            return res.sendStatus(500);
        }

        const receipts = new Array<ReceiptDAO>();
        for (const gallery of galleries) {
            let galleryReceipts: Array<ReceiptDAO>;
            try {
                galleryReceipts = await gallery.getReceipts();
            } catch (error) {
                console.log(`Unable to retrieve receipts for gallery ${gallery.id}`, error);
                continue;
            }

            receipts.push(...galleryReceipts);
        }

        const budgetItems = new Array<BudgetItemDAO>();
        for (const receipt of receipts) {
            let receiptBudgetItems: Array<BudgetItemDAO>;
            try {
                receiptBudgetItems = await receipt.getBudgetItems();
            } catch (error) {
                console.log(`Unable to retrieve budget items for receipt ${receipt.id}`, error);
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

/**
 * Updates an existing gallery, or creates a new one if it does not exist.
 */
galleryRouter.put(['/', '/:galleryId'],
    async (req: FullRequest, res) => {
        const user = req.user!;
        const gallery = req.body;

        let storedGallery = req.gallery;
        try {
            if (!storedGallery) {
                storedGallery = await user.createGallery(gallery);
            } else {
                await storedGallery.update(gallery);
            }
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }

        res.json(storedGallery);
    });

/**
 * Creates a new receipt for the provided gallery.
 */
galleryRouter.post('/:galleryId/receipt',
    async (req: FullRequest, res) => {
        const {gallery} = req;

        if (!gallery) {
            return res.sendStatus(404);
        }

        let receipt;
        try {
            receipt = await gallery.createReceipt(req.body, {
                fields: ['description', 'date']
            });
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }

        return res.json(receipt);
    });

/**
 * TODO implement
 * Deletes an existing gallery.
 */
galleryRouter.delete('/:galleryId',
    notImplemented);

/**
 * Adds the gallery DAO as req.gallery in the request, if it exists.
 */
galleryRouter.param('galleryId',
    async function(req: RequestGallery, res, next, galleryId) {
        const gallery = await GalleryDAO.findByPk(galleryId);

        if (gallery) {
            req.gallery = gallery;
        }
        return next();
    });
