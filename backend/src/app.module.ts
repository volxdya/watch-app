import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './core/files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { STATIC_CONFIG } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot(STATIC_CONFIG),
    FilesModule,
  ],
})
export class AppModule {}
