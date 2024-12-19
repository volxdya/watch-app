import { Query } from '@nestjs/graphql';
import { Service } from './service';
import { User } from 'src/core/user/user.gpql.model';

export abstract class AResolver<T extends Service> {
  constructor(private readonly service: T) {}

  @Query(() => [User], { name: 'user' })
  async findAll() {
    return await this.service.getAll();
  }
}
