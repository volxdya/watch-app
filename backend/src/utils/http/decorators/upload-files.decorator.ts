import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MULTER_CONFIG } from 'src/config';

export function UploadFiles(param: string) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(param, MULTER_CONFIG)),
  );
}