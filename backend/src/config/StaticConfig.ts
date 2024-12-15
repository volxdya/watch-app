import { join } from 'path';

export const STATIC_CONFIG = {
  rootPath: join(__dirname, '..', '..', 'uploads'),
  exclude: ['/api/(.*)'],
};
