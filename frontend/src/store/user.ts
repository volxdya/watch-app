import { makeAutoObservable } from 'mobx';
import { jwtDecode } from 'jwt-decode';
import { Payload } from '@/types/token-payload';
import { getItem } from '@/utils/localStorage';
import { IUser } from '@/types/user';
import { getRequest } from '@/utils/request';
import { AxiosError } from 'axios';

class User {
  constructor() {
    makeAutoObservable(this);
  }

  userData: Payload = {
    username: '',
    id: 0,
    avatar: '',
    description: '',
  };

  requestUser: IUser = {
    id: 0,
    username: '',
    videos: [],
    createdAt: new Date(8.64e15),
    updatedAt: new Date(8.64e15),
    avatar: '',
    description: '',
    visibleUsername: ''

  };

  me: IUser = {
    videos: [],
    id: 0,
    username: '',
    avatar: '',
    description: '',
    createdAt: new Date(8.64e15),
    updatedAt: new Date(8.64e15),
    visibleUsername: ''
  };

  getToken(): void {
    const token = getItem('token');

    if (token) {
      const decoded: Payload = jwtDecode(token);
      this.userData = decoded;
    }
  }

  async getOneUser(username: string): Promise<void> {
    await getRequest('user', 'findByUsername', username)
      .then((resp) => {
        this.requestUser = resp.data;
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  }

  async getMe(): Promise<void> {
    await getRequest('user', 'get_one', this.userData.id)
      .then((resp) => {
        this.me = resp.data;
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  }
}

export default new User();
