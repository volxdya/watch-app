import { Injectable } from '@nestjs/common';
import { Service } from 'src/abstractions';
import { VideoModel } from './video.model';
import { CreateVideoDto } from './dto/CreateVideoDto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class VideoService extends Service<CreateVideoDto> {
  constructor(
    @InjectModel(VideoModel)
    private readonly videoRepository: typeof VideoModel,
  ) {
    super(videoRepository);
  }
}
