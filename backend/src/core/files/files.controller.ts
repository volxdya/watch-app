import { Body, Controller, Get, Param, Post, UploadedFile } from '@nestjs/common';
import { FilesService } from './files.service';
import { UploadFiles } from 'src/utils/http/decorators';
import { DeleteFilesDto } from './dto/DeleteFilesDto';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post('upload')
  @UploadFiles('file')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.handleFileUpload(file);
  }

  @Post(`/deleteFiles`)
  deleteFiles(@Body() dto: DeleteFilesDto) {
    return this.fileService.deleteDirectoryFiles(dto);
  }

  @Post(`/deleteFile`)
  deleteFile(@Body() dto: DeleteFilesDto) {
    return this.fileService.deleteFile(dto.path);
  }
}
