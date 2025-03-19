import { Injectable } from '@nestjs/common';
import { Service } from '../../abstractions';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto/CreateUserDto';
import { FilesService } from '../files/files.service';
import { ServiceOptions } from 'src/types';
import { VideoModel } from '../video';
import * as bcrypt from 'bcrypt';
import { SubscriptionsModel } from '../subscriptions/subscriptions.model';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

export const userServiceOptions: ServiceOptions = {
  findAll: {
    include: [VideoModel, SubscriptionsModel],
  },
  findOne: {
    include: [VideoModel],
  },
  otherFind: {
    include: [VideoModel],
  },
};

@Injectable()
export class UserService extends Service<CreateUserDto> {
  constructor(
    @InjectModel(UserModel) private readonly userRepository: typeof UserModel,
    private readonly filesService: FilesService,
    private readonly subscriptionService: SubscriptionsService,
  ) {
    super(userRepository, userServiceOptions);
  }

  async register(dto: CreateUserDto) {
    const user = await this.create(dto);
    const hash: string = bcrypt.hashSync(user.password, 10);

    await user.update({
      password: hash,
      visibleUsername: user.username,
    });

    user.password = hash;
    user.visibleUsername = user.username;

    return user;
  }

  async uploadAvatar(file: Express.Multer.File, userId: number) {
    const avatarPath = this.filesService.handleFileUpload(file).filePath;

    const user = await this.getOne(userId);

    if (user.avatar !== '') {
      await this.filesService.deleteFile(user.avatar);
    }

    await user.update({
      avatar: avatarPath,
    });

    user.avatar = avatarPath;

    return user;
  }

  async update(id: number, dto: object) {
    const user = await this.getOne(id);

    await user.update(dto);

    return await this.getOne(id);
  }
}
