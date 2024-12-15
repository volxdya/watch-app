import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  handleFileUpload(file: Express.Multer.File) {
    // TODO: Логика валидации файла, в пайпах

    return { message: 'File uploaded successfully', filePath: file.path };
  }
}