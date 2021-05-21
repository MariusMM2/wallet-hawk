import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import createMemoryStore from 'memorystore';
import {port, sessionExpiryMillis, sessionSecret} from './app.config';
import {rootRouter} from './app.routes';
import {dbInstance} from './database';
import {tryUntilSuccessful} from './utils/misc.utils';

const MemoryStore = createMemoryStore(session);

const app = express();

app.use(morgan('dev'));
app.use(fileUpload({createParentPath: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: [
        'http://localhost:4200'
    ],
    credentials: true
}));
app.use(cookieParser(sessionSecret));
app.use(session({
    secret: sessionSecret,
    name: 'apiSid',
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({
        checkPeriod: sessionExpiryMillis / 7
    }),
    cookie: {
        maxAge: sessionExpiryMillis
    }
}));

app.use('/', rootRouter);

// noinspection JSIgnoredPromiseFromCall
tryUntilSuccessful(async () => {
    // reset the database instance on start/refresh
    await dbInstance.sync({force: true});

    app.listen(port, () => {
        console.log(`The application is listening on port ${port}!`);
    });
}, 1000, true);
