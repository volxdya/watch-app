import { API } from './env';

export function getFileUrl(avatar: string): string {
  return `${API}/${avatar.split('/')[1]}`;
}
