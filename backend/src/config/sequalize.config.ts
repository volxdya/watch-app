import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { CommentaryModel } from 'src/core/commentary/commentary.model';
import { UserModel } from 'src/core/user';
import { VideoModel } from 'src/core/video';

class SEQUALIZE_CONFIG {
  port: number = Number(process.env.POSTGRES_PORT);
  host: string = process.env.POSTGRES_HOST;
  db: string = process.env.POSTGRES_DATABASE;
  password: string = process.env.POSTGRES_PASSWORD;
  user: string = process.env.POSTGRES_USERNAME;
}

const { port, host, db, password, user } = new SEQUALIZE_CONFIG();

export const SEQUALIZE_OPTIONS: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: host,
  port: port,
  username: user,
  password: password,
  database: db,
  autoLoadModels: true,
  models: [UserModel, VideoModel, CommentaryModel],
};
