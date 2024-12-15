import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MULTER_CONFIG } from 'src/config';

@Module({
  imports: [
    MulterModule.register(MULTER_CONFIG),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
