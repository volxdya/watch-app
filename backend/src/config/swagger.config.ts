import { DocumentBuilder } from '@nestjs/swagger';

export const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle('Watch')
  .setDescription('Watch app api')
  .setVersion('1.0')
  .build();
