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
import { CommentaryModel } from '../commentary/commentary.model';

export interface VideoAttributes {
  title: string;
}

export interface VideoCreationAttributes extends VideoAttributes {}

@Table({ tableName: 'videos' })
export class VideoModel extends Model<
  VideoAttributes,
  VideoCreationAttributes
> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => UserModel)
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @HasMany(() => CommentaryModel)
  commenatires: CommentaryModel[];

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  videoFile: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  views: number;
}
