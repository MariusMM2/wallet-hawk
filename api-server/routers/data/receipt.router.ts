import Router from 'express';
import {CategoryDAO} from '../../database';

export const receiptRouter = Router();

/**
 * TODO remove
 * Retrieves all possible budget item categories.
 */
receiptRouter.get('/',
    async (req, res) => {
        const categories = await CategoryDAO.findAll();
        res.json(categories);
    });
