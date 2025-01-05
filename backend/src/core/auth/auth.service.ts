import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../user';
import { AuthDto } from './dto/AuthDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(dto: AuthDto) {
    const user: UserModel = await this.userService.otherFind(
      'username',
      dto.username,
    );

    const isValidate: boolean = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (user && isValidate) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Invalid username or password',
    });
  }

  async generateToken(user: UserModel) {
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

  async signIn(dto: AuthDto): Promise<{ access_token: string }> {
    const user = await this.validateUser(dto);

    return this.generateToken(user);
  }
}
