import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { FilesService } from '../files/files.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from './dto/update-user.dto';
import { VideoModel } from '../video';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userRepository: typeof UserModel,
    private readonly filesService: FilesService,
  ) {}

  async create(dto: CreateUserDto): Promise<UserModel> {
    const user: UserModel = await this.userRepository.create(dto);
    return user;
  }

  async findOne(userId: number): Promise<UserModel> {
    return await this.userRepository.findOne({
      where: { id: userId },
      include: [VideoModel],
    });
  }

  async findByUsername(username: string): Promise<UserModel> {
    return await this.userRepository.findOne({
      where: { username },
      include: [VideoModel],
    });
  }

  async findAll(): Promise<UserModel[]> {
    return await this.userRepository.findAll();
  }

  async register(dto: CreateUserDto): Promise<UserModel> {
    const user: UserModel = await this.create(dto);
    const hash: string = bcrypt.hashSync(user.password, 10);

    await user.update({
      password: hash,
      visibleUsername: user.username,
    });

    user.password = hash;
    user.visibleUsername = user.username;

    return user;
  }

  async uploadAvatar(
    file: Express.Multer.File,
    userId: number,
  ): Promise<UserModel> {
    const avatarPath: string =
      this.filesService.handleFileUpload(file).filePath;

    const user: UserModel = await this.findOne(userId);

    if (user.avatar !== '') {
      await this.filesService.deleteFile(user.avatar);
    }

    await user.update({
      avatar: avatarPath,
    });

    user.avatar = avatarPath;

    return user;
  }

  async update(id: number, dto: UpdateUserDTO): Promise<UserModel> {
    const user: UserModel = await this.findOne(id);
    const { avatar, visibleUsername, password, description } = dto;

    await user.update({
      avatar: avatar,
      visibleUsername: visibleUsername,
      password: password,
      description: description,
    });

    return this.findOne(id);
  }
}
