import Router from 'express';
import {authRouter} from './routers/auth.router';
import {categoryRouter} from './routers/data/category.router';
import {notImplemented} from './middleware/auth';
import {userRouter} from './routers/data/user.router';
import {budgetItemRouter} from './routers/data/budgetItem.router';

export const rootRouter = Router();

const dataRouter = Router();

rootRouter.use('/auth', authRouter);

dataRouter.use('/category', categoryRouter);
dataRouter.use('/gallery', notImplemented);
dataRouter.use('/receipt', notImplemented);
dataRouter.use('/receipt/:receiptId/budget-item', budgetItemRouter);
dataRouter.use('/budget-item/category', notImplemented);
dataRouter.use('/recurrence', notImplemented);
dataRouter.use('/search', notImplemented);

userRouter.use('/:userId/budget-item', budgetItemRouter);
userRouter.use('/:userId/goal', notImplemented);
dataRouter.use('/user', userRouter);

rootRouter.use('/data',
    // authGuard,
    dataRouter);
