import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ id, pass }: { id: number; pass: string }): Promise<any> {
    const user = await this.userService.findOne({ id: id });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, pass: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}