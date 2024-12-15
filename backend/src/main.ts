import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT: number = Number(process.env.SERVER_PORT) ?? 1234;
  const HOST: string = process.env.SERVER_HOST ?? 'localhost';

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(PORT, () => {
    console.log(`server -> http://${HOST}:${PORT}`);
  });
}

bootstrap();
