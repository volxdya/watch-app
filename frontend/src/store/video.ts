import { IEntity } from '@/types/db-entity';
import { UserType } from '@/types/user';
import { VideosType } from '@/types/video';
import { getRequest } from '@/utils/request';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

export interface IVideo extends IEntity {
  title: string;
  userId: number;
  description: string;
  videoFile: string;
  user: UserType;
}

interface IVideoStore extends IVideo {
  temporaryUrl: string;
}

class Video {
  constructor() {
    makeAutoObservable(this);
  }

  requestVideo: IVideoStore = {
    id: 0,
    title: '',
    userId: 0,
    description: '',
    createdAt: new Date(8.64e15),
    updatedAt: new Date(8.64e15),
    videoFile: '',
    temporaryUrl: '',
    user: {
      id: 0,
      username: '',
      videos: [],
      createdAt: '',
      avatar: '',
      password: '',
      description: '',
      visibleUsername: '',
    },
  };

  allVideos: VideosType = [];

  async getOneVideo(videoId: number): Promise<void> {
    await getRequest('video', 'find_one', videoId).then(
      (resp: AxiosResponse) => {
        this.requestVideo = resp.data;
      },
    );
  }

  async getAllVideos(): Promise<void> {
    if (this.allVideos.length > 0) return;

    await getRequest('video', 'find_all').then((resp: AxiosResponse) => {
      this.allVideos = resp.data;
    });
  }
}

export default new Video();
