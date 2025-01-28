import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { AController } from 'src/abstractions';
import { VideoService } from './video.service';
import { UploadFiles } from 'src/utils/http/decorators';
import { Docs } from 'src/utils/http/decorators/docs.decorator';

@Controller('video')
export class VideoController extends AController<VideoService> {
  constructor(private readonly videoService: VideoService) {
    super(videoService, { title: 'video' });
  }

  @Post('/upload')
  @UploadFiles('video')
  @Docs({
    summary: `upload video file`,
    status: 200,
    description: 'OK',
  })
  async uploadVideo(
    @Body('videoId') videoId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.videoService.uploadVideo(videoId, file);
  }

  @Delete('/delete/:videoId')
  @Docs({
    summary: `custom endpoint for delete video`,
    status: 200,
    description: 'OK',
  })
  async deleteVideo(@Param('videoId') videoId: number) {
    return this.videoService.deleteVideo(videoId);
  }

  @Post('/watch')
  async watch(@Body('videoId') videoId: number) {
    return this.videoService.watch(videoId);
  }
}
