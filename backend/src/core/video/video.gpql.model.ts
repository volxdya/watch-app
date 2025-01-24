import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Video {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  videoFile: string;

  @Field()
  description: string;
}
