import { z } from 'zod';
import { UserSchema } from './user';

export const VideoSchema = z.object({
  title: z.string(),
  userId: z.number(),
  description: z.string(),
  videoFile: z.string(),
  user: UserSchema,
  createdAt: z.string(),
  updatedAt: z.string()
})

export type Video = z.infer<typeof VideoSchema>;

const Videos = z.array(VideoSchema);

export type Videos = z.infer<typeof Videos>;