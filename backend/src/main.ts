import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './core/app.module';
import {
  HttpExceptionFilter,
  ThrottlerExceptionFilter,
} from './utils/http/filters';
import { AuthGuard } from './utils/http/guards';
import { JwtService } from '@nestjs/jwt';
import { SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const PORT: number = Number(process.env.SERVER_PORT) ?? 1234;
  const logger = new Logger('main', { timestamp: true });

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ThrottlerExceptionFilter(),
  );

  const documentFactory = () =>
    SwaggerModule.createDocument(app, SWAGGER_CONFIG);
  SwaggerModule.setup('/docs', app, documentFactory);

  app.useGlobalGuards(new AuthGuard(new Reflector(), new JwtService()));

  await app.listen(PORT, async () => {
    logger.debug(`server -> ${await app.getUrl()}`);
    logger.debug(`documentation -> ${await app.getUrl()}/docs`);
  });

  const shutdown = async (signal: string) => {
    logger.warn(`Received shutdown signal: ${signal}`);
    await app.close();
    logger.debug('Server gracefully shut down');
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrap();
