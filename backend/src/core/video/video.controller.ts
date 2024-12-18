import { Controller } from '@nestjs/common';
import { AController } from 'src/abstractions';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController extends AController<VideoService> {
  constructor(private readonly videoService: VideoService) {
    super(videoService);
  }
}
