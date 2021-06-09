import {
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasOneCreateAssociationMixin,
    HasOneGetAssociationMixin,
    Optional
} from 'sequelize';
import {
    AllowNull,
    BeforeBulkCreate,
    BeforeCreate,
    Column,
    DataType,
    Default,
    DefaultScope,
    HasMany,
    HasOne,
    Model,
    PrimaryKey,
    Scopes,
    Table,
    Unique
} from 'sequelize-typescript';
import {Gallery} from './gallery.dao';
import {Goal} from './goal.dao';
import {confirmHash, generateHash} from '../utils/crypto.utils';
import {BudgetItem} from './budgetItem.dao';

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
@DefaultScope(() => ({
    attributes: {
        exclude: ['password']
    }
}))
@Scopes(() => ({
    authentication: {
        attributes: {
            include: ['email', 'password']
        }
    }
}))
@Table({tableName: 'user'})
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public id!: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(254))
    public email!: string;

    @AllowNull(false)
    @Column(DataType.STRING(60))
    public password!: string;

    @Column(DataType.STRING(255))
    public firstName!: string | null;

    @Column(DataType.STRING(255))
    public lastName!: string | null;

    @HasOne(() => Goal)
    public goal?: Goal | null;

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    public getGoal!: HasOneGetAssociationMixin<Goal>;
    public createGoal!: HasOneCreateAssociationMixin<Goal>;

    @HasMany(() => Gallery)
    public galleries?: Array<Gallery>;

    public createGallery!: HasManyCreateAssociationMixin<Gallery>;
    public getGalleries!: HasManyGetAssociationsMixin<Gallery>;

    @HasMany(() => BudgetItem, {
        foreignKey: 'creatorId',
        constraints: false,
        scope: {
            creatorType: 'user'
        }
    })
    public budgetItems?: Array<BudgetItem>;

    public createBudgetItem!: HasManyCreateAssociationMixin<BudgetItem>;
    public getBudgetItems!: HasManyGetAssociationsMixin<BudgetItem>;

    // noinspection JSUnusedGlobalSymbols
    public validPassword(password: string) {
        return confirmHash(password, this.password);
    }

    @BeforeCreate
    @BeforeBulkCreate
    static hashPassword(instance: Array<User> | User) {
        if (!Array.isArray(instance)) {
            instance = [instance];
        }

        for (const user of instance) {
            user.password = generateHash(user.password);
        }
    }
}
