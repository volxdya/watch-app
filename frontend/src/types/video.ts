import { IEntity } from './db-entity';

export interface IVideo extends IEntity {
  id: number;
  title: string;
  userId: number;
  description: string;
}
