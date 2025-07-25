import { Controller, Get, Req, SetMetadata } from '@nestjs/common';
import * as os from 'os';

@Controller()
export class AppController {
  private readonly startTime = new Date();

  @Get('check_health')
  @SetMetadata('isPublic', true)
  checkHealth(@Req() request: Request) {
    return {
      hostname: os.hostname(),
      platform: os.platform(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      nodeVersion: process.version,
      pid: process.pid,
      cpuArch: process.arch,
      startTime: this.startTime.toISOString(),
    };
  }
}
