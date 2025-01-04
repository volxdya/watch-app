import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

const uploadDir = path.resolve('./uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const MULTER_CONFIG: MulterOptions = {
  limits: {
    fileSize: 1000 * 100000,
  },
  fileFilter: (req, file, callback) => {
    const allowedFormats = ['image/jpeg', 'image/png', 'video/mp4'];
    if (!allowedFormats.includes(file.mimetype)) {
      return callback(
        new HttpException('Invalid file format', HttpStatus.BAD_REQUEST),
        false,
      );
    }
    callback(null, true);
  },
  storage: diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
};
