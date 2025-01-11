import { API } from './env';

export function getAvatar(avatar: string) {
  return `${API}/${avatar.split('/')[1]}`;
}
