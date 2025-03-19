import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionsDto } from './dto/CreateSubscriptionsDto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('create_subscription')
  async createSubscription(@Body() dto: CreateSubscriptionsDto) {
    return await this.subscriptionsService.create(dto);
  }

  @Get('get_all')
  async getAll() {
    return await this.subscriptionsService.getAll();
  }

  @Post('subscribe')
  async subscribe(@Body() dto: CreateSubscriptionsDto) {
    return await this.subscriptionsService.subscribe(dto);
  }
}
