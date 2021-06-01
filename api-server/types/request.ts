import {Request} from 'express';
import {UserSession} from './userSession';
import {BudgetItemDAO, CreatorDAO, GalleryDAO, ReceiptDAO, UserDAO} from '../database';

export interface RequestSession extends Request {
    session: UserSession;
}

export interface RequestCreator extends Request {
    creator?: CreatorDAO;
    user?: UserDAO;
    receipt?: ReceiptDAO;
}

export interface RequestGallery extends Request {
    gallery?: GalleryDAO;
}

export interface RequestBudgetItem extends Request {
    budgetItem?: BudgetItemDAO,
}

export interface FullRequest extends RequestCreator, RequestGallery, RequestBudgetItem {
}
