import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/AuthDto';
import { Docs } from 'src/utils/http/decorators/docs.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  @SetMetadata('isPublic', true)
  @Docs({
    summary: `auth endpoint, which return access token`,
    status: 200,
    description: 'OK',
  })
  auth(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
}
