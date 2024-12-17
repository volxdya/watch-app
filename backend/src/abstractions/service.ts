import { InjectModel } from '@nestjs/sequelize';
import { Model } from 'sequelize-typescript';

// export abstract class Service<T = Model> {}

export abstract class Service {
  // protected constructor(
  //   @InjectModel(Model) private readonly repository: typeof Model,
  // ) {}

  async getAll() {
    // return this.repository.findAll();
  }

  test(): string {
    return 'test';
  }
}
