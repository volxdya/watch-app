import { Injectable } from '@nestjs/common';

@Injectable()
export class BotService {
  async notify(videoTitle: string) {
    await fetch('http://0.0.0.0:8000/notify', {
      method: 'POST',
      body: JSON.stringify({ video_title: videoTitle }),
    });
  }
}
