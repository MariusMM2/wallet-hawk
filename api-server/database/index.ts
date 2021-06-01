import {Sequelize} from 'sequelize-typescript';

import {User} from './user.dao';
import {Goal} from './goal.dao';
import {Gallery} from './gallery.dao';
import {Receipt} from './receipt.dao';
import {BudgetItem} from './budgetItem.dao';
import {Category} from './category.dao';
import {BudgetItemCategory} from './budgetItemCategory.bridge';

const sequelize = new Sequelize('mysql://user:password@localhost:3306/wallet-hawk', {
    define: {
        freezeTableName: true,
        timestamps: false
    },
    models: [
        User,
        Goal,
        Gallery,
        Receipt,
        BudgetItem,
        Category,
        BudgetItemCategory
    ],
});

export {sequelize as dbInstance};
export {User as UserDAO};
export {Goal as GoalDAO};
export {Gallery as GalleryDAO};
export {Receipt as ReceiptDAO};
export {BudgetItem as BudgetItemDAO};
export {Category as CategoryDAO};
export type CreatorDAO = User | Receipt;
