import { Body, Controller, Post, UploadedFile } from '@nestjs/common';
import { AController } from 'src/abstractions';
import { VideoService } from './video.service';
import { UploadFiles } from 'src/utils/http/decorators';
import { CreateVideoDto } from './dto/CreateVideoDto';

@Controller('video')
export class VideoController extends AController<VideoService> {
  constructor(private readonly videoService: VideoService) {
    super(videoService);
  }

  @Post('/upload')
  @UploadFiles('video')
  async uploadVideo(
    @Body() dto: CreateVideoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.videoService.uploadVideo(dto, file);
  }
}
