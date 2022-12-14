import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  private readonly jwtSecretKey = 'SECRET_KEY';

  generateJwt({ user }: { user: User }): string {
    return jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isOwner: user.isOwner,
      },
      this.jwtSecretKey,
      { expiresIn: '1d' },
    );
  }
}
