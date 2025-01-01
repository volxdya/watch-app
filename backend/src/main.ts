import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import {
  HttpExceptionFilter,
  ThrottlerExceptionFilter,
} from './utils/http/filters';

async function bootstrap() {
  const PORT: number = Number(process.env.SERVER_PORT) ?? 1234;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ThrottlerExceptionFilter(),
  );

  await app.listen(PORT, async () => {
    console.log(`server -> ${await app.getUrl()}`);
    console.log(`graphql playground -> ${await app.getUrl()}/api/graphql`);
  });
}

bootstrap();
