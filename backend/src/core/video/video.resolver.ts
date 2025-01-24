import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { SkipThrottle } from '@nestjs/throttler';
import { AResolver } from 'src/abstractions/resolver';
import { SetMetadata } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './video.gpql.model';

// @Resolver()
// @SkipThrottle()
// export class UserResolver extends AResolver<UserService> {
// }

@Resolver()
@SkipThrottle()
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @Query(() => [Video], { name: 'videos' })
  @SetMetadata('isPublic', true)
  async findAll() {
    return await this.videoService.getAll();
  }

  @Query(() => Video, { name: 'oneVideo' })
  @SetMetadata('isPublic', true)
  async author(@Args('id', { type: () => Int }) id: number) {
    return this.videoService.getOne(id);
  }
}
