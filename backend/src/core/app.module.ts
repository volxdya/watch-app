import { MyConfigModule } from 'src/config';
import { AiModule } from './ai/ai.module';
import { FilesModule } from './files/files.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MyConfigModule, FilesModule, UserModule, VideoModule, AiModule, AuthModule, JwtModule],
})
export class AppModule {}
