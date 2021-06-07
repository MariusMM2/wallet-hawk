import Router from 'express';
import {authRouter, budgetItemRouter, categoryRouter, galleryRouter, receiptRouter, userRouter} from './routers';
import {authGuard, notImplemented} from './middleware/auth';
import {debugRouter} from './debug/debug.router';

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


if (!process.env.PRODUCTION) {
    rootRouter.use('/debug', debugRouter);
}
