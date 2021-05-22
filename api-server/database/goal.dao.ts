import {Optional} from 'sequelize';
import {AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {User} from './user.dao';

/**
 * These are all the attributes in the Goal model.
 */
interface GoalAttributes {
    id: string,
    maxAmount: number;
}

/**
 * These attributes will be optional at .create() or .build().
 */
interface GoalCreationAttributes extends Optional<GoalAttributes, 'id'> {
}

/**
 * This is the Model Data Access Object itself.
 */
@Table({tableName: 'goal'})
export class Goal extends Model<GoalAttributes, GoalCreationAttributes> implements GoalAttributes {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public id!: string;

    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    public maxAmount!: number;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    public userId!: string;

    @BelongsTo(() => User)
    public user!: User;
}
