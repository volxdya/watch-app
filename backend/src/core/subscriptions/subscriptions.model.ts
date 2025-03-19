import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from '../user';

interface ISubscriptionsModel {
  userId: number;
  subscriptionId: number;
}

@Table({ tableName: 'subscriptions' })
export class SubscriptionsModel extends Model<
  SubscriptionsModel,
  ISubscriptionsModel
> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.INTEGER, unique: true })
  @ForeignKey(() => UserModel)
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @HasMany(() => UserModel)
  subscriptions: UserModel[];

  @HasMany(() => UserModel)
  subscribers: UserModel[];
}
