import {
    BelongsToGetAssociationMixin,
    BelongsToGetAssociationMixinOptions,
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyGetAssociationsMixinOptions,
    Optional
} from 'sequelize';
import {AfterFind, AllowNull, BelongsTo, BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {User} from './user.dao';
import {Receipt} from './receipt.dao';
import {Category} from './category.dao';
import {BudgetItemCategory} from './budgetItemCategory.bridge';

/**
 * These are all the attributes in the BudgetItem model.
 */
interface BudgetItemAttributes {
    id: string,
    name: string | null;
    description: string | null;
    totalPrice: number;
    quantity: number;
    date: Date;
    creatorId: string;
    creatorType: 'user' | 'receipt';
}

/**
 * These attributes will be optional at .create() or .build().
 */
interface BudgetItemCreationAttributes extends Optional<BudgetItemAttributes, 'id' | 'name' | 'description' | 'date'> {
}

/**
 * This is the Model Data Access Object itself.
 */
@Table({tableName: 'budget_item'})
export class BudgetItem extends Model<BudgetItemAttributes, BudgetItemCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public id!: string;

    @Column(DataType.STRING(100))
    public name!: string | null;

    @Column(DataType.STRING(400))
    public description!: string | null;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    public totalPrice!: number;

    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    public quantity!: number;

    @Default(() => new Date())
    @AllowNull(false)
    @Column(DataType.DATEONLY)
    public date!: Date;

    @BelongsToMany(() => Category, () => BudgetItemCategory)
    public categories?: Array<Category & { BudgetItemCategory?: BudgetItemCategory } | string>;

    public getCategories!: BelongsToManyGetAssociationsMixin<Category>;
    public addCategory!: BelongsToManyAddAssociationMixin<Category, string>;
    public addCategories!: BelongsToManyAddAssociationsMixin<Category, string>;

    public async getStrippedCategories(options?: BelongsToManyGetAssociationsMixinOptions): Promise<Array<string>> {
        return (await this.getCategories({
            attributes: {
                exclude: ['label']
            },
            ...options
        })).map(category => category.id);
    }

    public categoryIds?: Array<string>;

    @AllowNull(false)
    @Column(DataType.UUID)
    public creatorId!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    public creatorType!: 'user' | 'receipt';

    public creator?: User | Receipt;

    @BelongsTo(() => User, {
        foreignKey: 'creatorId',
        constraints: false
    })
    public user?: User;

    @BelongsTo(() => Receipt, {
        foreignKey: 'creatorId',
        constraints: false
    })
    public receipt?: Receipt;

    public getUser!: BelongsToGetAssociationMixin<User>;
    public getReceipt!: BelongsToGetAssociationMixin<Receipt>;

    public getCreator(options?: BelongsToGetAssociationMixinOptions): Promise<any> {
        if (!this.creatorType) {
            return Promise.resolve(null);
        }

        if (this.creatorType === 'user') {
            return this.getUser(options);
        }

        return this.getReceipt(options);
    }

    @AfterFind
    static appendCreator(findResult: Array<BudgetItem> | BudgetItem) {
        if (!Array.isArray(findResult)) {
            findResult = [findResult];
        }

        for (const budgetItem of findResult) {
            if (budgetItem.creatorType === 'user' && budgetItem.user !== undefined) {
                budgetItem.creator = budgetItem.user;
            } else if (budgetItem.creatorType === 'receipt' && budgetItem.receipt !== undefined) {
                budgetItem.creator = budgetItem.receipt;
            }
        }
    }

    @AfterFind
    static async stripCategories(findResult: Array<BudgetItem> | BudgetItem) {
        if (!Array.isArray(findResult)) {
            findResult = [findResult];
        }

        for (const budgetItem of findResult) {
            // @ts-ignore
            budgetItem.dataValues.categoryIds = await budgetItem.getStrippedCategories();
        }
    }
}
