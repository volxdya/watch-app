import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const header = request.headers.authorization;

    function callUnauthorizedExeption() {
      throw new HttpException('Missed token.', HttpStatus.UNAUTHORIZED);
    }

    try {
      const bearer: string = header.split(' ')[0];
      const token: string = header.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        callUnauthorizedExeption();
      }

      const decodedToken: AuthPayload = this.jwtService.decode(token);

      if (decodedToken === null) {
        callUnauthorizedExeption();
      }

      if (request.method == "PUT" && request.params) {
        if (Number(request.params.userId) !== decodedToken.id) {
          callUnauthorizedExeption();
        }
      }

      return true;
    } catch (err) {
      callUnauthorizedExeption();
    }
  }
}
