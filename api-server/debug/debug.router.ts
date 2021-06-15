import Router from 'express';
import {BudgetItemDAO, CategoryDAO, dbInstance, ReceiptDAO, UserDAO} from '../database';
import {categories, galleries, receipts, users} from './bulk.data';
import {Transaction} from 'sequelize';

export const debugRouter = Router();

debugRouter.post('/empty-database',
    async (_req, res) => {
        await resetDatabase();

        res.sendStatus(204);
    });

debugRouter.post('/replace-with-dummy-database',
    async (_req, res) => {
        // reset the database instance
        await resetDatabase();

        // users
        const currentUser: UserDAO = (await UserDAO.bulkCreate(users))[0];

        // categories
        const globalCategories: Array<CategoryDAO> = await CategoryDAO.findAll();

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
                await creator.createBudgetItem({
                    totalPrice: Math.random() * 1000000 - 500000,
                    quantity: Math.random() * 100,
                    description: `${creatorTag}.no. ${i}`,
                    date: getRandomDate(currentYear)
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
                totalPrice: 3000000,
                quantity: 1,
                date
            }, {transaction});

            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            return res.sendStatus(500);
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
            return res.sendStatus(500);
        }

        // receipts for galleries of current user
        const userGalleries = await currentUser.getGalleries();

        console.log('receipts user');
        transaction = await dbInstance.transaction();

        try {
            const currentYear = 2021;
            for (const userGallery of userGalleries) {
                const galleryReceipts = receipts.map((receipt) => {
                    return {
                        description: `${userGallery.name}.${receipt.description}`,
                        date: getRandomDate(currentYear)
                    };
                });

                for (const galleryReceipt of galleryReceipts) {
                    await userGallery.createReceipt(galleryReceipt, {transaction});
                }
            }

            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            return res.sendStatus(500);
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
            return res.sendStatus(500);
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
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            return res.sendStatus(500);
        }

        res.sendStatus(204);
    });

function getRandomDate(currentYear: number): Date {
    const date = new Date();
    date.setFullYear(currentYear - Math.floor(Math.random() * 2));
    date.setMonth(Math.floor(Math.random() * 12));
    date.setDate(Math.floor(Math.random() * 31) + 1);
    return date;
}

async function resetDatabase() {
    await dbInstance.sync({force: true});
    await CategoryDAO.bulkCreate(categories);
}
