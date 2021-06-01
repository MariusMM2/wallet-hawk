import Router from 'express';
import {ReceiptDAO} from '../../database';
import {FullRequest, RequestCreator} from '../../types/request';

export const receiptRouter = Router();

/**
 * Updates the fields of an existing receipt.
 */
receiptRouter.patch('/:receiptId',
    async (req: RequestCreator, res) => {
        const receipt = req.receipt!;
        const partialReceipt = req.body;

        try {
            await receipt.update(partialReceipt);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }

        res.json(receipt);
    });

/**
 * Deletes an existing receipt.
 */
receiptRouter.delete('/:receiptId',
    async (req: FullRequest, res) => {
        const receipt = req.receipt!;

        try {
            await receipt.destroy();
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }

        return res.sendStatus(204);
    });

/**
 * Adds the user DAO as req.creator in the request. Intended to be used to reuse the budgetItem
 * router with the user DAO.
 */
receiptRouter.param('receiptId',
    async function(req: RequestCreator, res, next, receiptId) {
        const receipt = await ReceiptDAO.findByPk(receiptId);

        if (receipt) {
            req.creator = receipt;
            req.receipt = receipt;

            return next();
        }

        res.status(404).send('receipt not found');
    });
