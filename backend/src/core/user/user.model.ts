import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { VideoModel } from '../video';
import { CommentaryModel } from '../commentary/commentary.model';

interface IUser {
  username: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<Model, IUser> {
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
