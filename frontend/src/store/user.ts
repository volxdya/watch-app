import { makeAutoObservable } from 'mobx';
import { jwtDecode } from 'jwt-decode';
import { Payload } from '@/types/token-payload';
import { getItem } from '@/utils/localStorage';
import { getRequest } from '@/utils/request';
import { AxiosError } from 'axios';
import { UserType } from '@/types/user';
import { meFetch } from '@/api/User';

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

  requestUser: UserType = {
    id: 0,
    username: '',
    videos: [],
    createdAt: '',
    avatar: '',
    password: '',
    description: '',
    visibleUsername: ''

  };

  me: UserType = {
    videos: [],
    id: 0,
    username: '',
    avatar: '',
    description: '',
    createdAt: '',
    visibleUsername: '',
    password: ''
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
        (error.message);
      });
  }

  async getMe(): Promise<void> {
    this.me = await meFetch();
  }
}

export default new User();
