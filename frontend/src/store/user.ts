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
  };

  getToken() {
    const token = getItem('token');

    if (token) {
      const decoded: Payload = jwtDecode(token);
      console.log(decoded);
      this.userData = decoded;
    }
  }

  async getOneUser(username: string) {
    if (this.requestUser.username === username) return;

    await getRequest('user', 'findByUsername', username)
      .then((resp) => {
        this.requestUser = resp.data;
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  }
}

export default new User();
