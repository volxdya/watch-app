import { z } from 'zod';

const VideoSchema = z.object({});

export const UserSchema = z.object({
  id: z.number(),
  avatar: z.string(),
  createdAt: z.string(),
  visibleUsername: z.string(),
  password: z.string(),
  username: z.string(),
  videos: z.array(VideoSchema),
  description: z.string()
});

export type UserType = z.infer<typeof UserSchema>;

export const Users = z.array(UserSchema);

export type UsersType = z.infer<typeof Users>;