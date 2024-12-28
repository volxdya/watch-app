import { Controller, Post, UploadedFile } from '@nestjs/common';
import { FilesService } from './files.service';
import { UploadFiles } from 'src/utils/http/decorators';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post('upload')
  @UploadFiles('file')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.handleFileUpload(file);
  }
}
