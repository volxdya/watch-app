import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  SetMetadata,
  UploadedFile,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { UploadFiles } from 'src/utils/http/decorators';
import { Docs } from 'src/utils/http/decorators/docs.decorator';
import { CreateVideoDto } from './dto/create-video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('create')
  @Docs({
    summary: `create video to db`,
    status: 200,
    description: 'OK',
  })
  async create(@Body() dto: CreateVideoDto) {
    return this.videoService.create(dto);
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

  @Get('/find_all')
  @SetMetadata('isPublic', true)
  async getAll() {
    return this.videoService.findAll();
  }

  @Get('/find_one/:id')
  @SetMetadata('isPublic', true)
  async findOne(@Param('id') id: number) {
    return this.videoService.findOne(id);
  }
}
