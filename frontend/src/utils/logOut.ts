import { removeItem } from './localStorage';

export function logOut() {
  removeItem('token');
  window.location.replace('/');
}
