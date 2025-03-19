import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
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
import { Docs } from 'src/utils/http/decorators/docs.decorator';
import { MeGuard } from 'src/utils/http/guards/me.guard';

@Controller('user')
export class UserController extends AController<UserService> {
  constructor(private readonly userService: UserService) {
    super(userService, { title: 'user' });
  }

  @Post('upload')
  @UploadFiles('avatar')
  @Docs({
    summary: `upload user avatar`,
    status: 200,
    description: 'OK',
  })
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: number,
  ) {
    return this.userService.uploadAvatar(file, userId);
  }

  @Get('findByUsername/:username')
  @SetMetadata('isPublic', true)
  async findByUsername(@Param('username') username: string) {
    return this.userService.otherFind('username', username);
  }

  @Post('register')
  @Docs({
    summary: `other endpoint for create user`,
    status: 200,
    description: 'OK',
  })
  @SetMetadata('isPublic', true)
  async register(@Body() dto: CreateUserDto) {
    return this.userService.register(dto);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() dto: object) {
    return this.userService.update(id, dto);
  }

  @Get('/get_me/:id')
  @UseGuards(MeGuard)
  async getMe(@Param('id') id: number) {
    return this.getOne(id);
  }
}
