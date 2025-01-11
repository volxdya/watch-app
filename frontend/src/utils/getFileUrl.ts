import { API } from './env';

export function getFileUrl(avatar: string) {
  return `${API}/${avatar.split('/')[1]}`;
}
