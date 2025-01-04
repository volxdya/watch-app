import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

export abstract class AGuard implements CanActivate {
  message: string;
  guardLogic: () => void;

  constructor(message: string, guardLogic: () => void) {
    this.message = message;
    this.guardLogic = guardLogic;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    try {
      this.guardLogic();

      return true;
    } catch (err) {
      throw new HttpException(this.message, HttpStatus.BAD_REQUEST);
    }
  }
}
