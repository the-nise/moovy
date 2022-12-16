import { Module } from '@nestjs/common';
import { AuthService } from './authentication.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService],
})
export class AuthModule {}
