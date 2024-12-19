import { Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { SkipThrottle } from '@nestjs/throttler';
import { AResolver } from 'src/abstractions/resolver';

@Resolver()
@SkipThrottle()
export class UserResolver extends AResolver<UserService> {
}
