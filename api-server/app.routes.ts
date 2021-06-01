import Router from 'express';
import {authRouter} from './routers/auth.router';
import {categoryRouter} from './routers/data/category.router';
import {authGuard, notImplemented} from './middleware/auth';
import {userRouter} from './routers/data/user.router';
import {budgetItemRouter} from './routers/data/budgetItem.router';
import {galleryRouter} from './routers/data/gallery.router';
import {receiptRouter} from './routers/data/receipt.router';

export const rootRouter = Router();

const dataRouter = Router();

rootRouter.use('/auth', authRouter);

dataRouter.use('/category', categoryRouter);
dataRouter.use('/recurrence', notImplemented);
dataRouter.use('/search', notImplemented);

receiptRouter.use('/:receiptId/budget-item', budgetItemRouter);
dataRouter.use('/receipt', receiptRouter);

userRouter.use('/:userId/gallery', galleryRouter);
userRouter.use('/:userId/receipt', receiptRouter);
userRouter.use('/:userId/budget-item', budgetItemRouter);
userRouter.use('/:userId/goal', notImplemented);
dataRouter.use('/user', userRouter);

rootRouter.use('/data',
    authGuard,
    dataRouter);
