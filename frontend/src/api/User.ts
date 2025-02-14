import user from '@/store/user';
import { UserType, Users, UserSchema, UsersType } from '@/types/user';
import { getItem } from '@/utils/localStorage';

const myHeaders = new Headers();

myHeaders.append('Authorization', `Bearer ${getItem('token')}`);

export function meFetch(): Promise<UserType> {
  // Кидаем GET запрос на сервер
  return (
    fetch(`http://localhost:8080/api/user/get_me/${user.userData.id}`, {
      method: 'GET',
      headers: myHeaders
    })
      // Парсим данные
      .then((response) => response.json())

      // Валидируем данные
      .then((data) => UserSchema.parse(data))
  );
}


export function usersFetch(): Promise<UsersType> {
  // Кидаем GET запрос на сервер
  return (
    fetch(`http://localhost:8080/api/user/get_all`, {
      method: 'GET',
      headers: myHeaders
    })
      // Парсим данные
      .then((response) => response.json())

      // Валидируем данные
      .then((data) => Users.parse(data))
  );
}

export function oneUserFetch(username: string): Promise<UserType> {
  // Кидаем GET запрос на сервер
  return (
    fetch(`http://localhost:8080/api/user/findByUsername/${username}`, {
      method: 'GET',
      headers: myHeaders
    })
      // Парсим данные
      .then((response) => response.json())

      // Валидируем данные
      .then((data) => UserSchema.parse(data))
  );
}