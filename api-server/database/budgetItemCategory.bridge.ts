import {AllowNull, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {BudgetItem} from './budgetItem.dao';
import {Category} from './category.dao';

/**
 * These are all the attributes in the Category model.
 */
interface BudgetItemCategoryAttributes {
    budgetItemId: string,
    categoryId: string;
}

/**
 * This is the Model Data Access Object itself.
 */
@Table({tableName: 'budget_item_category'})
export class BudgetItemCategory extends Model<BudgetItemCategoryAttributes> implements BudgetItemCategoryAttributes {
    @AllowNull(false)
    @ForeignKey(() => BudgetItem)
    @Column(DataType.UUID)
    public budgetItemId!: string;

    @AllowNull(false)
    @ForeignKey(() => Category)
    @Column(DataType.UUID)
    public categoryId!: string;
}
