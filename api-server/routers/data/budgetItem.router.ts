import {Router} from 'express';
import {CreatorDAO, RequestCreator} from '../../types/request';
import {BudgetItemDAO} from '../../database';

export const budgetItemRouter = Router({mergeParams: true});

budgetItemRouter.get('/',
    async (req: RequestCreator, res) => {
        let budgetItems: Array<BudgetItemDAO> | null = null;
        try {
            budgetItems = await req.creator?.getBudgetItems() || null;
        } catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }

        res.json(budgetItems);
    });

budgetItemRouter.put('/',
    async (req: RequestCreator, res) => {
        const creator: CreatorDAO = req.creator!;
        const budgetItem = req.body;
        console.log(budgetItem);

        let id = budgetItem.id;
        try {
            if (!id) {
                const newBudgetItem = await creator.createBudgetItem(budgetItem);
                await newBudgetItem.addCategories(budgetItem.categoryIds);

                id = newBudgetItem.id;
            } else {
                const existingBudgetItem = await BudgetItemDAO.findByPk(id);
                if (!existingBudgetItem) {
                    return res.sendStatus(500);
                }

                await existingBudgetItem.update(budgetItem, {
                    where: {
                        id
                    }
                });

                await existingBudgetItem!.updateCategories(budgetItem.categoryIds);
            }
        } catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }

        const resultBudgetItem = await BudgetItemDAO.findByPk(id);

        res.json(resultBudgetItem);
    });

budgetItemRouter.delete('/:id',
    async (req, res) => {
        const id = req.params.id;
        let result;
        try {
            result = await BudgetItemDAO.destroy({
                where: {
                    id
                }
            });
        } catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }

        if (result === 0) {
            return res.sendStatus(404);
        }

        return res.sendStatus(204);
    });
