import Router from 'express';
import {inputValidator, parseBasicEmail, parseBasicPassword, parseEmail, parsePassword} from '../middleware/inputValidators';
import {authGuard} from '../middleware/auth';
import {FullRequest} from '../types/request';
import {UserDAO} from '../database';

export const authRouter = Router();

/**
 * Validates 'email' and 'password' fields, searches the database
 * for matching credentials, adds the id of the user to the
 * session.
 */
authRouter.post('/login',
    // 'email' body attribute
    parseBasicEmail(),
    // 'password' body attribute
    parseBasicPassword(),
    // validate above attributes
    inputValidator,
    async (req: FullRequest, res) => {
        // gets email and password from request body
        const {email, password} = req.body;

        // checks credentials validity using the database
        let user = await UserDAO.scope('authentication').findOne({
            where: {email}
        });

        if (user === null || !user.validPassword(password)) {
            return res.status(403).json({error: 'Invalid email & password combination'});
        }

        // authentication is successful, retrieve full user
        user = await UserDAO.findOne({
            where: {email}
        });

        if (user) {
            req.session.userId = user!.id;

            res.json(user);
        } else {
            res.sendStatus(500);
        }
    });

/**
 * Validates provided fields, ensures that another user with the same email
 * is not in the database, hashes the password and returns status 201.
 */
authRouter.post('/register',
    // 'email' body attribute
    parseEmail()
        // ensure that email is not already in use
        .custom(async (email) => {
            const existingUser = await UserDAO.findOne({
                where: {email}
            });

            if (existingUser) {
                throw Error();
            }
        }).withMessage('must not be already in use'),
    // 'password' body attribute
    parsePassword('password'),
    // validate above attributes
    inputValidator,
    async (req, res) => {
        try {
            await UserDAO.create(req.body, {
                fields: ['firstName', 'lastName', 'email', 'password']
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }

        res.sendStatus(204);
    });

/**
 * Checks if the user's session is currently active.
 */
authRouter.get('/authenticated-user',
    authGuard,
    async (req: FullRequest, res) => {
        const id = req.session.userId;

        const user = await UserDAO.findOne({
            where: {id}
        });

        if (user) {
            req.session.resetMaxAge();

            res.json(user);
        } else {
            res.sendStatus(500);
        }
    });

/**
 * Logs the user out by destroying the session.
 */
authRouter.get('/logout',
    authGuard,
    (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(204);
            }
        });
    });
