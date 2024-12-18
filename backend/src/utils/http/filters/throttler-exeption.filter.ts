import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { AExceptionFilter } from './a.exeption-filter';

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter extends AExceptionFilter<ThrottlerException> implements ExceptionFilter {
    constructor() {
        super('Слишком много запросов');
    }
}