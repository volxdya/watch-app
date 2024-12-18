import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { AExceptionFilter } from './a.exeption-filter';

@Catch(HttpException)
export class HttpExceptionFilter
  extends AExceptionFilter<HttpException>
  implements ExceptionFilter {}
