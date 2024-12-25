import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AController } from '../../abstractions';
import { UpdateAvatar } from './dto/UpdateAvatar';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController extends AController<UserService> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Post('updateAvatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadAvatar(file);
  }
}
