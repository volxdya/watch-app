import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IVideo {
  title: string;
}

@Table({ tableName: 'videos' })
export class VideoModel extends Model<Model, IVideo> {
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
}
