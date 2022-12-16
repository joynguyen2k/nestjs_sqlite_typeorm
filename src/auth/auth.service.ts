import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/user.dto';

// Note: We have a lot of inline interfaces below just for brevity, ideally you should have these in separate interface files
@Injectable()
export class AuthService {
  private users: User[] = [
    {
      username: 'admin',
      password: 'password',
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  findUser(username: string): User | undefined {
    return this.users.find((u) => u.username === username);
  }

  createAccessToken(username: string): { accessToken: string } {
    return { accessToken: this.jwtService.sign({ sub: username }) };
  }

  async login(user: LoginDto): Promise<{ accessToken: string }> {
    try {
      const existingUser = this.findUser(user.username);

      if (!user) {
        throw new Error();
      }

      if (existingUser.password != user.password) {
        throw new Error('Password may be incorrect.Please try again');
      }
      return this.createAccessToken(user.username);
    } catch (e) {
      throw new UnauthorizedException(
        'Username or password may be incorrect. Please try again',
      );
    }
  }
}
