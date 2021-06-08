import {BelongsToManyGetAssociationsMixinOptions, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, Optional} from 'sequelize';
import {
    AfterFind,
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';
import {Gallery} from './gallery.dao';
import {BudgetItem} from './budgetItem.dao';

/**
 * These are all the attributes in the Receipt model.
 */
interface ReceiptAttributes {
    id: string,
    description: string | null;
    date: Date;
}

/**
 * These attributes will be optional at .create() or .build().
 */
interface ReceiptCreationAttributes extends Optional<ReceiptAttributes, 'id' | 'description' | 'date'> {
}

/**
 * This is the Model Data Access Object itself.
 */
@Table({tableName: 'receipt'})
export class Receipt extends Model<ReceiptAttributes, ReceiptCreationAttributes> implements ReceiptAttributes {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public id!: string;

    @Column(DataType.STRING(1000))
    public description!: string | null;

    @Default(() => new Date())
    @AllowNull(false)
    @Column(DataType.DATEONLY)
    public date!: Date;

    @AllowNull(false)
    @ForeignKey(() => Gallery)
    @Column(DataType.UUID)
    public galleryId!: string;

    @BelongsTo(() => Gallery)
    public gallery!: Gallery;

    @HasMany(() => BudgetItem, {
        foreignKey: 'creatorId',
        constraints: false,
        scope: {
            creatorType: 'receipt'
        }
    })
    public budgetItems?: Array<BudgetItem>;

    public createBudgetItem!: HasManyCreateAssociationMixin<BudgetItem>;
    public getBudgetItems!: HasManyGetAssociationsMixin<BudgetItem>;

    public async getStrippedBudgetItems(options?: BelongsToManyGetAssociationsMixinOptions): Promise<Array<string>> {
        const budgetItems = await this.getBudgetItems({
            attributes: ['id'],
            ...options
        });
        return budgetItems.map(budgetItem => budgetItem.id);
    }

    public budgetItemIds?: Array<string>;

    @AfterFind
    static async stripBudgetItems(findResult: Array<Receipt> | Receipt) {
        if (!Array.isArray(findResult)) {
            findResult = [findResult];
        }

        for (const receipt of findResult) {
            // @ts-ignore
            receipt.dataValues.budgetItemIds = await receipt.getStrippedBudgetItems();
        }
    }
}
