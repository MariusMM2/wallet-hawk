import {Router} from 'express';
import {RequestCreator} from '../../types/request';
import {BudgetItemDAO} from '../../database';
import {sleep} from '../../utils/misc.utils';

export const budgetItemRouter = Router({mergeParams: true});

budgetItemRouter.get('/',
    async (req: RequestCreator, res) => {
        let budgetItems: Array<BudgetItemDAO> | null = null;
        try {
            budgetItems = await req.creator?.getBudgetItems() || null;
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }

        await sleep(1000);

        res.json(budgetItems);
    });
