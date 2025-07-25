import { Videos, VideosType } from '@/types/video';

export function videosFetch(): Promise<VideosType> {
  // Кидаем GET запрос на сервер
  return fetch(`http://localhost:8080/api/video/get_all`, {
    method: 'GET',
  })
    .then((response) => response.json())

    .then((data) => Videos.parse(data));
}
