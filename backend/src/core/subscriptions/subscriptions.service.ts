import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateSubscriptionsDto } from './dto/CreateSubscriptionsDto';
import { InjectModel } from '@nestjs/sequelize';
import { SubscriptionsModel } from './subscriptions.model';
import { UserService } from '../user/user.service';
import { UserModel } from '../user';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(SubscriptionsModel)
    private readonly subscriptionsRepository: typeof SubscriptionsModel,
    @InjectModel(UserModel)
    private readonly userRepository: typeof UserModel,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {
  }

  public async create(dto: CreateSubscriptionsDto) {
    return await this.subscriptionsRepository.create(dto);
  }

  public async getAll() {
    return await this.subscriptionsRepository.findAll({
      include: { all: true },
    });
  }

  // Допилить
  public async subscribe(dto: CreateSubscriptionsDto) {
    const subscriber = await this.subscriptionsRepository.findOne({
      where: { userId: dto.userId },
      include: { all: true },
    });

    const userForSubscribe = await this.userRepository.findOne({
      where: { id: dto.subscriptionId },
    });

    await subscriber.$add('subscriptions', [userForSubscribe]);

    return subscriber;
  }
}
