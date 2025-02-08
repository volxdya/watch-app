import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class MeGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
    ) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const header: string | undefined = request.headers.authorization;

        const token: string = header.split(' ')[1];
        const id: number = Number(request.params.id);

        const decodedToken: AuthPayload = this.jwtService.decode(token);

        if (decodedToken.id !== id) {
            throw new HttpException('Not your token.', HttpStatus.UNAUTHORIZED);
        }

        return true;

    }
}
