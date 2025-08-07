import { apiConfig } from '@/config/site';
import { Videos, VideosType } from '@/types/video';

export function videosFetch(): Promise<VideosType> {
  return fetch(`${apiConfig.baseUrl}/video/find_all`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => Videos.parse(data));
}
