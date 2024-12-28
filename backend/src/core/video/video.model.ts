import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
