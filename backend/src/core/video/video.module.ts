import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { VideoModel } from './video.model';
import { UserModel } from '../user';
import { FilesModule } from '../files/files.module';
import { CommentaryModel } from '../commentary/commentary.model';
import { VideoResolver } from './video.resolver';
import { BotModule } from '../bot/bot.module';

@Module({
  imports: [
    SequelizeModule.forFeature([VideoModel, UserModel, CommentaryModel]),
    FilesModule,
    BotModule,
  ],
  providers: [VideoService, VideoResolver],
  controllers: [VideoController],
})
export class VideoModule {}
