import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ContentTypeGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (
      request.headers['Content-type'] != 'application/json' &&
      (request.method === 'POST' || request.method === 'PUT')
    ) {
      throw new HttpException('No content type.', HttpStatus.BAD_REQUEST);
    }

    return true;
  }
}
