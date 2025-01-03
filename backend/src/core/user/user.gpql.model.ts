import { Field, Int, ObjectType } from '@nestjs/graphql';
import { VideoModel } from '../video';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  avatar: string;
}
