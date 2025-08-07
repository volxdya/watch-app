import { Injectable, Logger } from '@nestjs/common';
import { Notify } from './types/notify.type';

@Injectable()
export class BotService {
  private logger = new Logger(BotService.name);

  botUrl: string = `http://${process.env.BOT_HOST}:${process.env.BOT_PORT}`;

  async notify(videoData: Notify) {
    try {
      await fetch(`${this.botUrl}/notify`, {
        method: 'POST',
        body: JSON.stringify({
          video_title: videoData.videoTitle,
          video_user: videoData.videoUser,
          video_url: videoData.videoUrl,
        }),
      });

      this.logger.log('Видео успешно отправлено в бота');
    } catch (err) {
      this.logger.error('Произошла ошибка при отправке видео', err);
    }
  }
}
