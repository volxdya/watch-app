import { Args, Int, Query, Resolver } from '@nestjs/graphql';
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

  @Query(() => [User], { name: 'users' })
  @SetMetadata('isPublic', true)
  async findAll() {
    return await this.userService.getAll();
  }

  @Query(() => User, { name: 'oneUser' })
  @SetMetadata('isPublic', true)
  async author(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getOne(id);
  }
}
