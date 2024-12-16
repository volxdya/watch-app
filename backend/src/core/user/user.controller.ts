import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { AController } from '../../abstractions';

@Controller('user')
export class UserController extends AController<UserService> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}