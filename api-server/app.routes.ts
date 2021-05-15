import Router from 'express';
import {authRouter} from './routers/auth.router';

export const rootRouter = Router();

rootRouter.use('/auth', authRouter);
