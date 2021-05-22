import {HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, Optional} from 'sequelize';
import {AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {User} from './user.dao';
import {Receipt} from './receipt.dao';

/**
 * These are all the attributes in the Gallery model.
 */
interface GalleryAttributes {
    id: string,
    name: string | null;
    description: string | null;
}

/**
 * These attributes will be optional at .create() or .build().
 */
interface GalleryCreationAttributes extends Optional<GalleryAttributes, 'id' | 'name' | 'description'> {
}

/**
 * This is the Model Data Access Object itself.
 */
@Table({tableName: 'gallery'})
export class Gallery extends Model<GalleryAttributes, GalleryCreationAttributes> implements GalleryAttributes {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public id!: string;

    @Column(DataType.STRING(300))
    public name!: string | null;

    @Column(DataType.STRING(1000))
    public description!: string | null;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    public userId!: string;

    @BelongsTo(() => User)
    public user!: User;

    @HasMany(() => Receipt, {
        onDelete: 'CASCADE'
    })
    public receipts?: Array<Receipt>;

    public createReceipt!: HasManyCreateAssociationMixin<Receipt>;
    public getReceipts!: HasManyGetAssociationsMixin<Receipt>;
}
