import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { FilesModule } from '../files/files.module';
import { VideoModel } from '../video';
import { CommentaryModel } from '../commentary/commentary.model';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, VideoModel, CommentaryModel]),
    FilesModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
