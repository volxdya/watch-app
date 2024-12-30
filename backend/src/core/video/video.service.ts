import { Injectable } from '@nestjs/common';
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

  // Доработать
  async uploadVideo(dto: CreateVideoDto, file: Express.Multer.File) {
    const videoPath: string = this.filesService.handleFileUpload(file).filePath;

    const newDto = { ...dto, videoPath };

    const video = await this.create(newDto);

    video.videoFile = videoPath;

    return video;
  }
}
