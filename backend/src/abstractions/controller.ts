import { Body, Delete, Get, Param, Post } from '@nestjs/common';
import { Service } from './service';
import { Dto } from './dto';

export abstract class AController<T extends Service> {
  constructor(private readonly service: T) {}

  @Get('get_all')
  getAll() {
    return this.service.getAll();
  }

  @Post('create')
  async create(@Body() dto: Dto) {
    return this.service.create(dto);
  }

  @Get('get_one/:id')
  async getOne(@Param('id') id: number) {
    return this.service.getOne(id);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
