import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UploadFiles } from 'src/utils/http/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { Docs } from 'src/utils/http/decorators/docs.decorator';
import { MeGuard } from 'src/utils/http/guards/me.guard';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    return this.userService.findByUsername(username);
  }

  @Get('find_one/:id')
  async findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
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

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateUserDTO) {
    return this.userService.update(id, dto);
  }

  @Get('get_me/:id')
  @UseGuards(MeGuard)
  async getMe(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get('find_all')
  async findAll() {
    return this.userService.findAll();
  }
}
