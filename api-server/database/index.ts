import {Sequelize} from 'sequelize';

/**
 * Look at https://sequelize.org/master/manual/typescript.html.
 */
export const dbInstance = new Sequelize('mysql://user:password@localhost:3306/wallet-hawk', {
    define: {
        freezeTableName: true,
        timestamps: false
    }
});

export {User as UserDAO} from './user.dao';
export {BudgetItem as BudgetItemDAO} from './budgetItem.dao';

