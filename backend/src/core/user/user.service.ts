import { Injectable } from '@nestjs/common';
import { Service } from '../../abstractions';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto/CreateUserDto';
import { FilesService } from '../files/files.service';
import { UpdateAvatar } from './dto/UpdateAvatar';

@Injectable()
export class UserService extends Service<CreateUserDto> {
  constructor(
    @InjectModel(UserModel) private readonly userRepository: typeof UserModel,
    private readonly filesService: FilesService,
  ) {
    super(userRepository);
  }

  uploadAvatar(file: Express.Multer.File) {
    return this.filesService.handleFileUpload(file);
  }
}
