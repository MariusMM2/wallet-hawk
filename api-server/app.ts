import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import createMemoryStore from 'memorystore';
import {port, sessionExpiryMillis, sessionSecret} from './app.config';
import {BudgetItemDAO, CategoryDAO, dbInstance, GalleryDAO, UserDAO} from './database';
import {tryUntilSuccessful} from './utils/misc.utils';
import {rootRouter} from './app.routes';

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

    const user = await UserDAO.create({
        email: 'asd1@asdf',
        password: 'asd1@asdf'
    }, {
        include: [GalleryDAO]
    });

    console.log('user', user);

    const gallery = await user.createGallery({
        name: 'Foetex'
    });

    console.log('gallery', gallery);

    const receipt = await gallery.createReceipt({
        description: 'week 20, 2021'
    });

    console.log('receipt', receipt);

    const budgetItem = await receipt.createBudgetItem({
        totalPrice: 10000,
        quantity: 10
    });

    console.log('budgetItem', budgetItem);

    const creator = await budgetItem.getCreator();

    console.log('creator', creator);

    const budgetItem2 = await user.createBudgetItem({
        totalPrice: 1000,
        quantity: 1
    });

    console.log('budgetItem2', budgetItem2);

    const creator2 = await budgetItem2.getCreator();

    console.log('creator2', creator2);

    console.log('user budget items', await user.getBudgetItems());

    const categories = await CategoryDAO.bulkCreate([
        {
            label: 'Home'
        },
        {
            label: 'Hygiene'
        },
        {
            label: 'Electronics'
        },
        {
            label: 'Groceries'
        },
        {
            label: 'Fast Food'
        }
    ]);

    console.log(categories);

    await budgetItem.addCategories(
        categories.map(category => category.id)
    );

    // const scopedCategories = await budgetItem.getCategories({
    //     attributes: {
    //         exclude: ['label']
    //     }
    // });
    //
    // console.log('budget item categories', scopedCategories);

    const scopedCategories2 = await (await BudgetItemDAO.findOne({
        where: {
            totalPrice: 10000
        }
    }))?.getCategories();

    const scopedCategories3 = await (await BudgetItemDAO.findOne({
        where: {
            totalPrice: 10000
        }
    }))?.getStrippedCategories();

    console.log('full categories', scopedCategories2);
    console.log('stripped categories', scopedCategories3);

    // noinspection JSIgnoredPromiseFromCall
    await app.listen(port, () => {
        console.log(`The application is listening on port ${port}!`);
    });
}, 1000, true);
