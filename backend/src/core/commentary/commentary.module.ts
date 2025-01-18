import { Module } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { CommentaryController } from './commentary.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../user';
import { VideoModel } from '../video';
import { CommentaryModel } from './commentary.model';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, VideoModel, CommentaryModel]),
  ],
  controllers: [CommentaryController],
  providers: [CommentaryService],
})
export class CommentaryModule {}
