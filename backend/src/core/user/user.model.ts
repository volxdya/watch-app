import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { VideoModel } from '../video';

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
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
  })
  avatar: string;

  @HasMany(() => VideoModel)
  videos: VideoModel[];
}
