import {DataTypes, Model, Optional} from 'sequelize';
import {confirmHash, generateHash} from '../utils/crypto.utils';
import {dbInstance} from './index';

/**
 * These are all the attributes in the User model.
 */
interface UserAttributes {
    id: string,
    email: string;
    password: string;
    firstName: string | null;
    lastName: string | null;
}

/**
 * These attributes will be optional at .create() or .build().
 */
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'firstName' | 'lastName'> {
}

/**
 * This is the Model Data Access Object itself.
 */
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public email!: string;
    public password!: string;
    public firstName!: string | null;
    public lastName!: string | null;

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    // public getBudgetItems!: HasManyGetAssociationsMixin<BudgetItem>; // Note the null assertions!
    // public addBudgetItem!: HasManyAddAssociationMixin<BudgetItem, number>;
    // public hasBudgetItem!: HasManyHasAssociationMixin<BudgetItem, number>;
    // public countBudgetItems!: HasManyCountAssociationsMixin;
    // public createProject!: HasManyCreateAssociationMixin<BudgetItem>;

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    // public readonly budgetItems?: BudgetItem[]; // Note this is optional since it's only populated when explicitly requested in code

    // public static associations: {
    //     projects: Association<User, BudgetItem>;
    // };

    public static generateHash(password: string) {
        return generateHash(password);
    }

    public validPassword(password: string) {
        return confirmHash(password, this.password);
    }
}

// initialize the model
User.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
            type: new DataTypes.STRING(254),
            allowNull: false,
            unique: true
        },
        password: {
            type: new DataTypes.STRING(60),
            allowNull: false
        },
        firstName: {
            type: new DataTypes.STRING(255)
        },
        lastName: {
            type: new DataTypes.STRING(255)
        }
    },
    {
        sequelize: dbInstance,
        tableName: 'user',
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        },
        scopes: {
            authentication: {
                attributes: {
                    include: ['email', 'password']
                }
            }
        }
    }
);

// hash the password before insertion in the database
User.beforeCreate(function(model) {
    model.password = User.generateHash(model.password);
});
