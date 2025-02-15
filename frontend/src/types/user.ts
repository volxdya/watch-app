import { z } from 'zod';
import { VideoSchemaNoUser } from './video';

export const UserSchema = z.object({
  id: z.number(),
  avatar: z.string(),
  createdAt: z.string(),
  visibleUsername: z.string(),
  password: z.string(),
  username: z.string(),
  videos: z.array(VideoSchemaNoUser),
  description: z.string()
});

export type UserType = z.infer<typeof UserSchema>;

export const Users = z.array(UserSchema);

export type UsersType = z.infer<typeof Users>;