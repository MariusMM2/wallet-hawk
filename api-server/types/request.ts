import {Request} from 'express';
import {UserSession} from './userSession';
import {ReceiptDAO, UserDAO} from '../database';

export interface RequestSession extends Request {
    session: UserSession;
}

export interface RequestCreator extends Request {
    creator?: CreatorDAO;
    user?: UserDAO;
    receipt?: ReceiptDAO;
}

export type CreatorDAO = UserDAO | ReceiptDAO;
