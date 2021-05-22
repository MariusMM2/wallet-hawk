import {Sequelize} from 'sequelize-typescript';

import {User} from './user.dao';
import {Goal} from './goal.dao';
import {Gallery} from './gallery.dao';
import {Receipt} from './receipt.dao';
import {BudgetItem} from './budgetItem.dao';
import {Category} from './category.dao';
import {BudgetItemCategory} from './budgetItemCategory.bridge';

export const sequelize = new Sequelize('mysql://user:password@localhost:3306/wallet-hawk', {
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

// const userGalleryOptions = {
//     onDelete: 'CASCADE',
//     foreignKey: {
//         name: 'userId',
//         allowNull: false
//     }
// };
// User.hasMany(Gallery, userGalleryOptions);
//
// const galleryReceiptOptions = {
//     onDelete: 'CASCADE',
//     foreignKey: {
//         name: 'galleryId',
//         allowNull: false
//     }
// };
// Gallery.hasMany(Receipt, galleryReceiptOptions);


export {sequelize as dbInstance};
export {User as UserDAO};
export {Goal as GoalDAO};
export {Gallery as GalleryDAO};
export {Receipt as ReceiptDAO};
export {BudgetItem as BudgetItemDAO};
export {Category as CategoryDAO};
