import session from 'express-session';

export interface UserSession extends session.Session {
    userId?: string;
}
