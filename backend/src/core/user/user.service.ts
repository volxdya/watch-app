import { Injectable } from '@nestjs/common';
import { Service } from '../../abstractions';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto/CreateUserDto';
import { FilesService } from '../files/files.service';

@Injectable()
export class UserService extends Service<CreateUserDto> {
  constructor(
    @InjectModel(UserModel) private readonly userRepository: typeof UserModel,
    private readonly filesService: FilesService,
  ) {
    super(userRepository);
  }

  async uploadAvatar(file: Express.Multer.File, userId: number) {
    const avatarPath = this.filesService.handleFileUpload(file).filePath;

    const user = await this.getOne(userId);

    if (user.avatar != '') {
      await this.filesService.deleteFile(user.avatar);
    }

    await user.update({
      avatar: avatarPath,
    });

    user.avatar = avatarPath;

    return user;
  }
}
