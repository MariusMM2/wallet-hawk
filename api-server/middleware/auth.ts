/**
 * This file contains various middleware functions.
 */
import {NextFunction, Response} from 'express';
import {FullRequest} from '../types/request';

/**
 * Middleware function that restricts route access
 * to authenticated users.
 * @param {FullRequest} req - The Request object
 * @param {Response} res - The Response object
 * @param {NextFunction} next - The middleware function callback argument
 */
export function authGuard(req: FullRequest, res: Response, next: NextFunction) {
    const {userId} = req.session;
    if (userId) {
        // user is signed in
        return next();
    } else {
        // user is not signed in
        // set HTTP status to 401 "Unauthorized"
        res.status(401).json({error: 'user is not authenticated'});
    }
}

/**
 * Middleware function that responds with a
 * 501 "Not Implemented" status code.
 * @param {FullRequest} req - The Request object
 * @param {Response} res - The Response object
 * @param {NextFunction} next - The middleware function callback argument
 */
export function notImplemented(req: FullRequest, res: Response, next: NextFunction) {
    res.sendStatus(501);
}
