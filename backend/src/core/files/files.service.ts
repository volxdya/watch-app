import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  handleFileUpload(file: Express.Multer.File) {
    // TODO: Логика валидации файла, в пайпах
    const filePath = `uploads/${file.filename}`;
    return { message: 'File uploaded successfully', filePath };
  }
}
