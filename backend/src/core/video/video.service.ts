import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Service } from 'src/abstractions';
import { VideoModel } from './video.model';
import { CreateVideoDto } from './dto/CreateVideoDto';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../user';
import { ServiceOptions } from 'src/types';
import { FilesService } from '../files/files.service';

export const videoServiceOptions: ServiceOptions = {
  findAll: {
    include: [UserModel],
  },
  findOne: {
    include: [UserModel],
  },
  otherFind: {
    include: null,
  },
};

@Injectable()
export class VideoService extends Service<CreateVideoDto> {
  constructor(
    @InjectModel(VideoModel)
    private readonly videoRepository: typeof VideoModel,
    private readonly filesService: FilesService,
  ) {
    super(videoRepository, videoServiceOptions);
  }

  async uploadVideo(videoId: number, file: Express.Multer.File) {
    const video = await this.getOne(videoId);
    const videoPath: string = this.filesService.handleFileUpload(file).filePath;

    // TODO: Убрать это в Guards
    if (video === null) {
      await this.filesService.deleteFile(videoPath);
      throw new HttpException("Video doesn't exists", HttpStatus.BAD_REQUEST);
    }

    await video.update({
      videoFile: videoPath,
    });

    video.videoFile = videoPath;

    return video;
  }

  async deleteVideo(videoId: number) {
    const video = await this.getOne(videoId);

    await this.delete(videoId);

    if (video.videoFile !== null) {
      await this.filesService.deleteFile(video.videoFile);
    }

    return video;
  }

  async watch(videoId: number) {
    const video = await this.getOne(videoId);
    await video.update({
      views: video.views + 1,
    });

    video.views = video.views + 1;
    
    return video;
  }
}
