import { Videos, VideosType } from '@/types/video';
import { getItem } from '@/utils/localStorage';

const myHeaders = new Headers();

myHeaders.append('Authorization', `Bearer ${getItem('token')}`);


export function videosFetch(): Promise<VideosType> {
  // Кидаем GET запрос на сервер
  return (
    fetch(`http://localhost:8080/api/video/get_all`, {
      method: 'GET',
      headers: myHeaders
    })
      // Парсим данные
      .then((response) => response.json())

      // Валидируем данны
      .then((data) => Videos.parse(data))
  );
}