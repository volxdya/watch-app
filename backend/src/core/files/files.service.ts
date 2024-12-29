import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { DeleteFilesDto } from './dto/DeleteFilesDto';

@Injectable()
export class FilesService {
  handleFileUpload(file: Express.Multer.File) {
    // TODO: Логика валидации файла, в пайпах
    const filePath = `uploads/${file.filename}`;
    return { message: 'File uploaded successfully', filePath };
  }

  async deleteFile(path: string) {
    fs.unlink(path, (err) => {
      // TODO: Написать пайп для обработки исключений.
      if (err) {
        console.error('Ошибка удаления файла:', err);
        return;
      }
      console.log('Файл успешно удален.');
    });
  }

  // Удаление файлов из директории
  async deleteDirectoryFiles(dto: DeleteFilesDto) {
    const directoryPath: string = dto.path;

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error('Ошибка чтения директории:', err);
        return;
      }

      const filePaths = files.map((file) => path.join(directoryPath, file));

      for (let i = 0; i < filePaths.length; i++) {
        this.deleteFile(filePaths[i]);
      }
    });
  }
}
