import { forwardRef, Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubscriptionsModel } from './subscriptions.model';
import { UserModule } from '../user/user.module';
import { UserModel } from '../user';

@Module({
  imports: [
    SequelizeModule.forFeature([SubscriptionsModel, UserModel]),
    forwardRef(() => UserModule),
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
