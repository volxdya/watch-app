import {
  Model,
  Column,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { UserModel } from '../user';
import { VideoModel } from '../video';

interface ICommentaryModel {
  userId: number;
  videoId: number;
  text: string;
}

@Table({ tableName: 'commentary' })
export class CommentaryModel extends Model<CommentaryModel, ICommentaryModel> {
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
  text: string;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => UserModel)
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => VideoModel)
  videoId: number;

  @BelongsTo(() => VideoModel)
  video: VideoModel;
}
