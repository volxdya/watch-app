import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AController } from '../../abstractions';
import { UploadFiles } from 'src/utils/http/decorators';
import { CreateUserDto } from './dto/CreateUserDto';

@Controller('user')
export class UserController extends AController<UserService> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Put('updateAvatar/:userId')
  @UploadFiles('avatar')
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: number,
  ) {
    return this.userService.uploadAvatar(file, userId);
  }
  
  @Get('findByUsername/:username')
  async findByUsername(@Param('username') username: string) {
    return this.userService.otherFind('username', username);
  }

  @Post('register')
  @SetMetadata('isPublic', true)
  async register(@Body() dto: CreateUserDto) {
    return this.userService.register(dto);
  }
}
