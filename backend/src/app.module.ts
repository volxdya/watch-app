import { Module } from '@nestjs/common';
import { FilesModule } from './core/files/files.module';
import { UserModule } from './core/user/user.module';
import { MyConfigModule } from './config';
import { VideoModule } from './core/video/video.module';
import { AiModule } from './core/ai/ai.module';

@Module({
  imports: [MyConfigModule, FilesModule, UserModule, VideoModule, AiModule],
})
export class AppModule {}
