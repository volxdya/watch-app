import { removeItem } from './localStorage';

export function logOut(): void {
  removeItem('token');
  window.location.replace('/');
}
