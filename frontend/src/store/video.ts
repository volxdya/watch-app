import { IVideo } from '@/types/video';
import { createBlobUrl } from '@/utils/getUrlFromFile';
import { getRequest } from '@/utils/request';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

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
      createdAt: new Date(8.64e15),
      updatedAt: new Date(8.64e15),
      avatar: '',
      description: '',
    },
  };

  allVideos: IVideo[] = [];

  async getOneVideo(videoId: number) {
    await getRequest('video', 'get_one', videoId).then(
      (resp: AxiosResponse) => {
        this.requestVideo = resp.data;
      },
    );

    const videoFile = this.requestVideo.videoFile.split('/')[1];

    createBlobUrl(videoFile).then((value: string | undefined) => {
      if (value) {
        this.requestVideo.temporaryUrl = value;
      }
    });
  }

  async getAllVideos() {
    if (this.allVideos.length > 0) return;

    await getRequest('video', 'get_all').then((resp: AxiosResponse) => {
      this.allVideos = resp.data;
    });
  }
}

export default new Video();
