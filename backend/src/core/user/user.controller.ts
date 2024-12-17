import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { AController } from '../../abstractions';

@Controller('user')
export class UserController extends AController<UserService> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Get('/get_all_users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
