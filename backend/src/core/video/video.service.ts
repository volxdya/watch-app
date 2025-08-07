import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { VideoModel } from './video.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { BotService } from '../bot/bot.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UserModel } from '../user';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(VideoModel)
    private readonly videoRepository: typeof VideoModel,
    private readonly filesService: FilesService,
    private readonly botService: BotService,
  ) {}

  private readonly logger = new Logger(VideoService.name);

  async findOne(videoId: number) {
    return await this.videoRepository.findOne({
      where: { id: videoId },
      include: [UserModel],
    });
  }

  async findAll(): Promise<VideoModel[]> {
    return await this.videoRepository.findAll({ include: { all: true } });
  }

  async create(dto: CreateVideoDto): Promise<VideoModel> {
    return await this.videoRepository.create(dto);
  }

  async deleteOne(videoId: number): Promise<void> {
    await this.videoRepository.destroy({ where: { id: videoId } });
  }

  async uploadVideo(videoId: number, file: Express.Multer.File) {
    const video = await this.findOne(videoId);
    const videoPath: string = this.filesService.handleFileUpload(file).filePath;

    if (video === null) {
      await this.filesService.deleteFile(videoPath);
      throw new HttpException(
        'Данного видео не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    await video.update({
      videoFile: videoPath,
    });

    video.videoFile = videoPath;

    try {
      await this.botService.notify({
        videoTitle: video.title,
        videoUrl:
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        videoUser: video.user.username,
      });
    } catch (err) {
      this.logger.error('Видео в бота не пришло!', err);
    }

    return video;
  }

  async deleteVideo(videoId: number) {
    const video = await this.findOne(videoId);

    await this.deleteOne(videoId);

    if (video.videoFile !== null) {
      await this.filesService.deleteFile(video.videoFile);
      return video;
    }
  }

  async watch(videoId: number) {
    try {
      const video = await this.findOne(videoId);
      await video.update({
        views: video.views + 1,
      });

      video.views = video.views + 1;

      return video;
    } catch (err) {
      return new NotFoundException('Данного видео не существует');
    }
  }
}
