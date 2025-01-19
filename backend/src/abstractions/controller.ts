import { Body, Delete, Get, Param, Post, SetMetadata } from '@nestjs/common';
import { Service } from './service';
import { Dto } from './dto';
import { Docs } from 'src/utils/http/decorators/docs.decorator';

export abstract class AController<T extends Service> {
  metaInfo: ControllerMetaInfo;

  constructor(private readonly service: T, metaInfo?: ControllerMetaInfo) {
    this.metaInfo = metaInfo;
  }

  @Get('get_all')
  @Docs({
    summary: `get all`,
    status: 200,
    description: 'got all',
  })
  getAll() {
    return this.service.getAll();
  }

  @Post('create')
  @SetMetadata('isPublic', true)
  @Docs({
    summary: `create`,
    status: 200,
    description: 'created',
  })
  async create(@Body() dto: Dto) {
    return this.service.create(dto);
  }

  @Get('get_one/:id')
  @Docs({
    summary: `get one entity by id`,
    status: 200,
    description: 'got one entity by id',
  })
  async getOne(@Param('id') id: number) {
    return this.service.getOne(id);
  }

  @Delete('delete/:id')
  @Docs({
    summary: `delete one entity by id`,
    status: 200,
    description: 'deleted one entity be id',
  })
  async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
