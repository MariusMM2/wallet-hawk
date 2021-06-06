import {Router} from 'express';
import {FullRequest, RequestBudgetItem, RequestCreator} from '../../types/request';
import {BudgetItemDAO, CreatorDAO} from '../../database';

export const budgetItemRouter = Router({mergeParams: true});

/**
 * Retrieves all budget items for the provided creator.
 */
budgetItemRouter.get('/',
    async (req: RequestCreator, res) => {
        const creator: CreatorDAO = req.creator!;
        let budgetItems: Array<BudgetItemDAO> | null = null;
        try {
            budgetItems = await creator.getBudgetItems() ?? null;
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }

        res.json(budgetItems);
    });

/**
 * Updates an existing budget item, or creates a new one if it does not exist.
 */
budgetItemRouter.put(['/', '/:budgetItemId'],
    async (req: FullRequest, res) => {
        const creator: CreatorDAO = req.creator!;
        const budgetItem = req.body;

        let storedBudgetItem = req.budgetItem;
        try {
            if (!storedBudgetItem) {
                storedBudgetItem = await creator.createBudgetItem(budgetItem);
            } else {
                await storedBudgetItem.update(budgetItem);
            }

            await storedBudgetItem.setCategories(budgetItem.categoryIds);
            await storedBudgetItem.reload();
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }

        res.json(storedBudgetItem);
    });

/**
 * Deletes an existing budget item.
 */
budgetItemRouter.delete('/:budgetItemId',
    async (req: RequestBudgetItem, res) => {
        const budgetItem = req.budgetItem!;

        try {
            await budgetItem.destroy();
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
budgetItemRouter.param('budgetItemId',
    async function(req: RequestBudgetItem, res, next, budgetItemId) {
        const budgetItem = await BudgetItemDAO.findByPk(budgetItemId);

        if (budgetItem) {
            req.budgetItem = budgetItem;

            return next();
        }

        res.status(404).send('budget item not found');
    });
