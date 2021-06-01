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

// TODO implement this format later
userRouter.use('/:userId/gallery/:galleryId/receipt/:receiptId/budget-item', notImplemented);

userRouter.use('/:userId/gallery', galleryRouter);
userRouter.use('/:userId/gallery/:galleryId/receipt', receiptRouter);
userRouter.use('/:userId/budget-item', budgetItemRouter);
userRouter.use('/:userId/goal', notImplemented);
dataRouter.use('/user', userRouter);

rootRouter.use('/data',
    authGuard,
    dataRouter);
