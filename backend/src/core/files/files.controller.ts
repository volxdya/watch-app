import { Body, Controller, Post, UploadedFile } from '@nestjs/common';
import { FilesService } from './files.service';
import { UploadFiles } from 'src/utils/http/decorators';
import { DeleteFilesDto } from './dto/DeleteFilesDto';
import { Docs } from 'src/utils/http/decorators/docs.decorator';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post('upload')
  @UploadFiles('file')
  @Docs({
    summary: `upload one file`,
    status: 200,
    description: 'uploaded file',
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.handleFileUpload(file);
  }

  @Post(`/deleteFiles`)
  @Docs({
    summary: `delete files from one directory`,
    status: 200,
    description: 'OK',
  })
  deleteFiles(@Body() dto: DeleteFilesDto) {
    return this.fileService.deleteDirectoryFiles(dto);
  }

  @Post(`/deleteFile`)
  @Docs({
    summary: `delete one file by path`,
    status: 200,
    description: 'OK',
  })
  deleteFile(@Body() dto: DeleteFilesDto) {
    return this.fileService.deleteFile(dto.path);
  }
}
