import { ServiceOptions } from 'src/types';
import { Dto } from './dto';

export abstract class Service<T = Dto> {
  private repository: any;
  private options: ServiceOptions;

  constructor(repository: any, options: ServiceOptions) {
    this.repository = repository;
    this.options = options;
  }

  async getAll() {
    return this.repository.findAll(this.options.findAll);
  }

  async create(dto: T) {
    return this.repository.create(dto);
  }

  async delete(id: number) {
    return this.repository.destroy({ where: { id: id } });
  }

  async getOne(id: number) {
    const entity = await this.repository.findOne({
      where: { id: id },
      include: this.options.findOne.include,
    });
    return entity;
  }

  async otherFind(fieldForFind: string, data: string) {
    return this.repository.findOne({
      where: { [fieldForFind]: data },
      include: this.options.otherFind.include,
    });
  }
}
