import {Request} from 'express';
import {UserSession} from './userSession';

export interface FullRequest extends Request {
    session: UserSession;
}
