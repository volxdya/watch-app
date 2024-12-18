import { ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

export abstract class AExceptionFilter<T extends HttpException> {
    message: string;

    constructor(message?: string) {
      this.message = message;
    }

    catch(exception: T, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const request = ctx.getRequest<Request>();

        response
          .status(status)
          .json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: this.message ?? exception.message,
          });
      }
}