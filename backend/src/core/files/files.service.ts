import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { DeleteFilesDto } from './dto/DeleteFilesDto';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  handleFileUpload(file: Express.Multer.File) {
    const filePath = `uploads/${file.filename}`;
    return { message: 'Файл успешно загружен', filePath };
  }

  async deleteFile(path: string) {
    fs.unlink(path, (err) => {
      if (err) {
        this.logger.error('Ошибка удаления файла:', err);
        return;
      }
      this.logger.log(`Файл ${path} успешно удален.`);
    });
  }

  async deleteDirectoryFiles(dto: DeleteFilesDto) {
    const directoryPath: string = dto.path;

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        this.logger.error('Ошибка чтения директории:', err);
        return;
      }

      const filePaths = files.map((file) => path.join(directoryPath, file));

      for (let i = 0; i < filePaths.length; i++) {
        this.deleteFile(filePaths[i]);
      }
    });
  }
}
