import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { VideoModel } from './video.model';

@Module({
  imports: [SequelizeModule.forFeature([VideoModel])],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
