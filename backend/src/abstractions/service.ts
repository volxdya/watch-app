import { Dto } from './dto';

export abstract class Service<T = Dto> {
  repositoty: any;

  constructor(repository: any) {
    this.repositoty = repository;
  }

  async getAll() {
    return this.repositoty.findAll();
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
