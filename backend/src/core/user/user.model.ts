import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { VideoModel } from '../video';
import { CommentaryModel } from '../commentary/commentary.model';

interface User {
  id: number;
  username: string;
  avatar: string;
  visibleUsername: string;
  password: string;
  description: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, User> {
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
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  visibleUsername: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
  })
  description: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
  })
  avatar: string;

  @HasMany(() => VideoModel)
  videos: VideoModel[];

  @HasMany(() => CommentaryModel)
  commentaries: CommentaryModel[];
}
