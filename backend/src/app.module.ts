import { Module } from '@nestjs/common';
import { FilesModule } from './core/files/files.module';
import { UserModule } from './core/user/user.module';
import { MyConfigModule } from './config';

@Module({
  imports: [MyConfigModule, FilesModule, UserModule],
})
export class AppModule {}
