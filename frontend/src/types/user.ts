import { IEntity } from './db-entity';
import { Payload } from './token-payload';
import { IVideo } from './video';

export interface IUser extends Payload, IEntity {
  videos: IVideo[];
  visibleUsername: string;
}
