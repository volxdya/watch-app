import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { UserResolver } from './user.resolver';
import { FilesModule } from '../files/files.module';
import { VideoModel } from '../video';
import { CommentaryModel } from '../commentary/commentary.model';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, VideoModel, CommentaryModel]),
    FilesModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
