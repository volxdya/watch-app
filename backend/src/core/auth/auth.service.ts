import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../user';
import { AuthDto } from './dto/AuthDto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(dto: AuthDto): Promise<{ access_token: string }> {
    const { username, password } = dto;

    const user: UserModel = await this.userService.otherFind(
      'username',
      username,
    );

    if (user?.password !== password) {
      throw new UnauthorizedException('Invalide data');
    }

    const payload: AuthPayload = {
      id: user.id,
      description: user.description,
      avatar: user.avatar,
      username: user.username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
