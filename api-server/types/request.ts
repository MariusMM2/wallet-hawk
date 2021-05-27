import {Request} from 'express';
import {UserSession} from './userSession';
import {ReceiptDAO, UserDAO} from '../database';

export interface RequestSession extends Request {
    session: UserSession;
}

export interface RequestCreator extends Request {
    creator?: UserDAO | ReceiptDAO;
    user?: UserDAO | ReceiptDAO;
    receipt?: UserDAO | ReceiptDAO;
}
