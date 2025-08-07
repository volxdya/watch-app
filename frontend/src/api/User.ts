import { apiConfig } from '@/config/site';
import user from '@/store/user';
import { UserType, Users, UserSchema, UsersType } from '@/types/user';
import { getItem } from '@/utils/localStorage';

const myHeaders = new Headers();

myHeaders.append('Authorization', `Bearer ${getItem('token')}`);

export function meFetch(): Promise<UserType> {
  return fetch(`${apiConfig.baseUrl}/user/get_me/${user.userData.id}`, {
    method: 'GET',
    headers: myHeaders,
  })
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}

export function usersFetch(): Promise<UsersType> {
  return fetch(`${apiConfig.baseUrl}/api/user/find_all`, {
    method: 'GET',
    headers: myHeaders,
  })
    .then((response) => response.json())
    .then((data) => Users.parse(data));
}

export function oneUserFetch(username: string): Promise<UserType> {
  return fetch(`${apiConfig.baseUrl}/user/findByUsername/${username}`, {
    method: 'GET',
    headers: myHeaders,
  })
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}
