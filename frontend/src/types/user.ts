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

export type User = z.infer<typeof UserSchema>;

const Users = z.array(UserSchema);

export type Users = z.infer<typeof Users>;
