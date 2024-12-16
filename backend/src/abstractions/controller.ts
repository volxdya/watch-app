import { Get } from '@nestjs/common';
import { Service } from './service';

export abstract class AController<T extends Service> {
  constructor(private readonly service: T) {}

  @Get('get_all')
  getAll() {
    return this.service.getAll();
  }

  @Get('test')
  test() {
    return this.service.test();
  }
}
