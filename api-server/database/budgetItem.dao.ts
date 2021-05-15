import {DataTypes, Model, Optional} from 'sequelize';
import {dbInstance} from './index';

/**
 * These are all the attributes in the User model.
 */
interface BudgetItemAttributes {
    id: string,
    name: string | null;
    description: string | null;
    totalPrice: number;
    quantity: number;
    date: Date;
}

/**
 * These attributes will be optional at .create() or .build().
 */
interface BudgetItemCreationAttributes extends Optional<BudgetItemAttributes, 'id' | 'name' | 'description'> {
}

/**
 * This is the Model Data Access Object itself.
 */
export class BudgetItem extends Model<BudgetItemAttributes, BudgetItemCreationAttributes> implements BudgetItemAttributes {
    public id!: string;
    public name!: string | null;
    public description!: string | null;
    public totalPrice!: number;
    public quantity!: number;
    public date!: Date;
}

// initialize the model
BudgetItem.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: new DataTypes.STRING(100),
            allowNull: true,
        },
        description: {
            type: new DataTypes.STRING(400),
            allowNull: true,
        },
        totalPrice: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
    },
    {
        sequelize: dbInstance,
        tableName: 'budget_item'
    }
);
