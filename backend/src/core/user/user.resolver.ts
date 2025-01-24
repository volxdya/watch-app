import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { SkipThrottle } from '@nestjs/throttler';
import { AResolver } from 'src/abstractions/resolver';
import { User } from './user.gpql.model';
import { SetMetadata } from '@nestjs/common';

// @Resolver()
// @SkipThrottle()
// export class UserResolver extends AResolver<UserService> {
// }

@Resolver()
@SkipThrottle()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'user' })
  async findAll() {
    return await this.userService.getAll();
  }
}
