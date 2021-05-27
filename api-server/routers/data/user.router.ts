import Router from 'express';
import {inputValidator, isCurrentUser, parseUUID} from '../../middleware/inputValidators';
import {UserDAO} from '../../database';
import {RequestCreator} from '../../types/request';

export const userRouter = Router();

/**
 * Adds the user DAO as req.creator in the request. Intended to be used to reuse the budgetItem
 * router with the receipt DAO.
 */
userRouter.param('userId',
    async function(req: RequestCreator, res, next, userId) {
        const user = await UserDAO.findOne({
            where: {
                id: userId
            }
        });

        if (user) {
            req.creator = user;
            req.user = user;

            return next();
        }

        res.sendStatus(500);
    });

/**
 * Ensures that any route that contains a user id is only accessed
 * by a user with that same id.
 *
 * Note: This should have been execute before userRouter.param('userId', ...) from above, but it doesn't.
 * If anything, move the code inside .param() after the inputValidator below.
 */
userRouter.use([
        '/:userId',
        '/:userId/*'
    ],
    // 'id' url param
    parseUUID('userId')
        // ensure that the id param and the session.userId are the same
        .custom(isCurrentUser),
    inputValidator);
