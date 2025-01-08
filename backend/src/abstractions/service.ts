import { ServiceOptions } from 'src/types';
import { Dto } from './dto';

export abstract class Service<T = Dto> {
  private repositoty: any;
  private options: ServiceOptions;

  constructor(repository: any, options: ServiceOptions) {
    this.repositoty = repository;
    this.options = options;
  }

  async getAll() {
    return this.repositoty.findAll(this.options.findAll);
  }

  async create(dto: T) {
    return this.repositoty.create(dto);
  }

  async delete(id: number) {
    return this.repositoty.destroy({ where: { id: id } });
  }

  async getOne(id: number) {
    const entity = await this.repositoty.findOne({ where: { id: id } });
    return entity;
  } 

  async otherFind(fieldForFind: string, data: string) {
    return this.repositoty.findOne({
      where: { [fieldForFind]: data },
      include: this.options.otherFind.include,
    });
  }
}
