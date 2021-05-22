import {Optional} from 'sequelize';
import {AllowNull, BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {BudgetItem} from './budgetItem.dao';
import {BudgetItemCategory} from './budgetItemCategory.bridge';

/**
 * These are all the attributes in the Category model.
 */
interface CategoryAttributes {
    id: string,
    label: string;
}

/**
 * These attributes will be optional at .create() or .build().
 */
interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {
}

/**
 * This is the Model Data Access Object itself.
 */
@Table({tableName: 'category'})
export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public id!: string;

    @AllowNull(false)
    @Column(DataType.STRING(30))
    public label!: string;

    @BelongsToMany(() => BudgetItem, () => BudgetItemCategory)
    public budgetItems?: Array<BudgetItem>;
}
