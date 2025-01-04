import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/AuthDto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth')
  @SetMetadata('isPublic', true)
  auth(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
}
