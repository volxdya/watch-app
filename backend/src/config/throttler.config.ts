import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const THROTTLER_CONFIG: ThrottlerModuleOptions = [
  {
    ttl: 3600 * 1000,
    limit: 1000000,
  },
];
