import Router from 'express';
import {CategoryDAO} from '../../database';

export const categoryRouter = Router();

/**
 * Retrieves all possible budget item categories.
 */
categoryRouter.get('/',
    async (req, res) => {
        const categories = await CategoryDAO.findAll();
        res.json(categories);
    });
