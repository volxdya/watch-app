import { z } from 'zod';

export const VideoSchema = z.object({
  id: z.number(),
  title: z.string(),
  userId: z.number(),
  description: z.string(),
  videoFile: z.string(),
  user: z.object({
    id: z.number(),
    avatar: z.string(),
    createdAt: z.string(),
    visibleUsername: z.string(),
    password: z.string(),
    username: z.string(),
    description: z.string()
  }),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type VideoType = z.infer<typeof VideoSchema>;

export const Videos = z.array(VideoSchema);

export type VideosType = z.infer<typeof Videos>;

export const VideoSchemaNoUser = z.object({
  id: z.number(),
  title: z.string(),
  userId: z.number(),
  description: z.string(),
  videoFile: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type VideoTypeNoUser = z.infer<typeof VideoSchemaNoUser>;

export const VideosNoUser = z.array(VideoSchemaNoUser);

export type VideosTypeNoUser = z.infer<typeof VideosNoUser>;
