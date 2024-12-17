import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SEQUALIZE_OPTIONS } from './config';

async function bootstrap() {
  const PORT: number = Number(process.env.SERVER_PORT) ?? 1234;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(PORT, async() => {
    console.log(SEQUALIZE_OPTIONS)
    console.log(`server -> ${await app.getUrl()}`);
  });
}

bootstrap();