import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import createMemoryStore from 'memorystore';
import {port, sessionExpiryMillis, sessionSecret} from './app.config';
import {BudgetItemDAO, CategoryDAO, dbInstance, ReceiptDAO, UserDAO} from './database';
import {tryUntilSuccessful} from './utils/misc.utils';
import {rootRouter} from './app.routes';
import {Transaction} from 'sequelize';
import {categories, galleries, receipts, users} from './bulk.data';

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

    // users
    const currentUser: UserDAO = (await UserDAO.bulkCreate(users))[0];

    // categories
    const globalCategories: Array<CategoryDAO> = await CategoryDAO.bulkCreate(categories);

    // TODO reuse in receipt creation for bulk budget items
    // ..and if user creates multiple at once?
    console.log('user');
    let transaction: Transaction = await dbInstance.transaction();

    async function budgetItemsGenerator(creator: UserDAO | ReceiptDAO, transaction: Transaction, max = 500) {
        let creatorTag;
        if (creator instanceof UserDAO) {
            creatorTag = creator.email;
        } else {
            creatorTag = creator.description;
        }

        const currentYear = 2021;

        for (let i = 0; i < max; i++) {
            const date = new Date();
            // TODO find better implementation
            date.setFullYear(currentYear - Math.floor(Math.random() * 2));
            date.setMonth(Math.floor(Math.random() * 12));
            date.setDate(Math.floor(Math.random() * 31) + 1);
            await creator.createBudgetItem({
                totalPrice: Math.random() * 10000 - 5000,
                quantity: Math.random() * 100,
                description: `${creatorTag}.no. ${i}`,
                date
            }, {transaction});
        }
    }

    // budget items for current user
    try {
        await budgetItemsGenerator(currentUser, transaction);

        const date = new Date();
        date.setDate(1);
        // dummy item for the salary at the beginning of a month
        await currentUser.createBudgetItem({
            totalPrice: 30000,
            quantity: 1,
            date
        }, {transaction});

        await transaction.commit();
    } catch (e) {
        await transaction.rollback();
    }

    // galleries for current user
    console.log('galleries user');
    transaction = await dbInstance.transaction();

    try {
        for (const gallery of galleries) {
            await currentUser.createGallery(gallery, {transaction});
        }

        await transaction.commit();
    } catch (e) {
        await transaction.rollback();
    }

    // receipts for galleries of current user
    const userGalleries = await currentUser.getGalleries();

    console.log('receipts user');
    transaction = await dbInstance.transaction();

    try {
        const currentYear = 2021;
        for (const userGallery of userGalleries) {
            const galleryReceipts = receipts.map((receipt) => {
                const date = new Date();
                // TODO find better implementation
                date.setFullYear(currentYear - Math.floor(Math.random() * 2));
                date.setMonth(Math.floor(Math.random() * 12));
                date.setDate(Math.floor(Math.random() * 31) + 1);

                return {
                    description: `${userGallery.name}.${receipt.description}`,
                    date
                };
            });

            for (const galleryReceipt of galleryReceipts) {
                await userGallery.createReceipt(galleryReceipt, {transaction});
            }
        }

        await transaction.commit();
    } catch (e) {
        await transaction.rollback();
    }

    // budget items for receipts for galleries of current user
    console.log('galleries user');
    transaction = await dbInstance.transaction();

    try {
        const receipts = await ReceiptDAO.findAll();
        for (const receipt of receipts) {
            await budgetItemsGenerator(receipt, transaction, 15);
        }

        await transaction.commit();
    } catch (e) {
        await transaction.rollback();
    }

    // categories for budget items for current user and for receipts for galleries of current user
    const budgetItems = await BudgetItemDAO.findAll();
    const globalCategoryIds = globalCategories.map(category => category.id);
    transaction = await dbInstance.transaction();

    try {
        for (const budgetItem of budgetItems) {
            const randomNCategories = Math.floor(Math.random() * globalCategoryIds.length + 0.5);

            const itemCategories = [];

            for (let i = 0; i < randomNCategories; i++) {
                const randomCategoryIndex = Math.floor(Math.random() * (globalCategoryIds.length - 1) + 0.5);
                itemCategories.push(globalCategoryIds[randomCategoryIndex]);
            }

            const deduplicatedItemCategories: Array<string> = new Array(...new Set(itemCategories));


            await budgetItem.addCategories(deduplicatedItemCategories, {transaction});
        }

        await transaction.commit();
    } catch (e) {
        console.log(e);
        await transaction.rollback();
    }

    // await dbInstance.sync();

    await app.listen(port, () => {
        console.log(`The application is listening on port ${port}!`);
    });
}, 1000, true);
