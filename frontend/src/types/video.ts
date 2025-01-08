import { IEntity } from './db-entity';
import { IUser } from './user';

export interface IVideo extends IEntity {
  title: string;
  userId: number;
  description: string;
  videoFile: string;
  user: IUser;
}
