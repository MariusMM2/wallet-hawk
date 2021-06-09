import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import createMemoryStore from 'memorystore';
import {corsWhitelist, port, sessionExpiryMillis, sessionSecret} from './app.config';
import {tryUntilSuccessful} from './utils/misc.utils';
import {rootRouter} from './app.routes';
import {dbInstance} from './database';

const MemoryStore = createMemoryStore(session);

const app = express();

app.use(morgan('dev'));
app.use(fileUpload({createParentPath: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: function(origin, callback) {
        if (!origin) {
            return callback(null, true);
        } else if (corsWhitelist.includes(origin)) {
            return callback(null, true);
        }
        const message = `The CORS policy does not allow access from ${origin}.`;
        return callback(new Error(message), false);
    },
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
    await dbInstance.sync();
    await app.listen(port, () => {
        console.log(`The application is listening on port ${port}!`);
    });
}, 1000, true);
