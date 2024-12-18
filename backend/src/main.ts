import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter, ThrottlerExceptionFilter } from './utils/http/filters';

async function bootstrap() {
  const PORT: number = Number(process.env.SERVER_PORT) ?? 1234;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter(), new ThrottlerExceptionFilter());

  await app.listen(PORT, async () => {
    console.log(`server -> ${await app.getUrl()}`);
  });
}

bootstrap();
