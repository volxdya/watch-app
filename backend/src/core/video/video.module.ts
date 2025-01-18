import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { VideoModel } from './video.model';
import { UserModel } from '../user';
import { FilesModule } from '../files/files.module';
import { CommentaryModel } from '../commentary/commentary.model';

@Module({
  imports: [SequelizeModule.forFeature([VideoModel, UserModel, CommentaryModel]), FilesModule],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
