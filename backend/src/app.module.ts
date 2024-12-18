import { Module } from '@nestjs/common';
import { FilesModule } from './core/files/files.module';
import { UserModule } from './core/user/user.module';
import { MyConfigModule } from './config';
import { VideoModule } from './core/video/video.module';

@Module({
  imports: [MyConfigModule, FilesModule, UserModule, VideoModule],
})
export class AppModule {}
