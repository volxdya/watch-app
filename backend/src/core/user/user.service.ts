import { Injectable } from '@nestjs/common';
import { Service } from '../../abstractions';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';

// @Injectable()
// export class UserService extends Service {
//     constructor() {
//         super(UserModel);
//     }
// }

@Injectable()
export class UserService extends Service {
  constructor(
    @InjectModel(UserModel) private readonly userRepository: typeof UserModel,
  ) {
    super();
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }
}
