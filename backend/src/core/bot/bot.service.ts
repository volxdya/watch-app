import { Injectable } from '@nestjs/common';
import { Notify } from './types/notify.type';

@Injectable()
export class BotService {
  async notify(videoData: Notify) {
    await fetch('http://0.0.0.0:8000/notify', {
      method: 'POST',
      body: JSON.stringify({
        video_title: videoData.videoTitle,
        video_user: videoData.videoUser,
        video_url: videoData.videoUrl,
      }),
    });
  }
}
