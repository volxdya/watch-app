import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'entities' })
export class Entity extends Model<Entity> {
  @Column
  name: string;
}