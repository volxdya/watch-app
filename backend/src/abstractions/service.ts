import { Includeable } from 'sequelize';
import { Dto } from './dto';

interface FindAllOptions {
  include: Includeable[] | Includeable;
}

interface ServiceOptions {
  findAll: FindAllOptions;
}

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
    return await this.repositoty.findOne({ where: { id: id } });
  }
}
