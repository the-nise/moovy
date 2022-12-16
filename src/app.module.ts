import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { LibraryModule } from './library/library.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/authentication.service';
import { LocalStrategy } from './auth/strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'loonachuu',
      database: 'moovy',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    User,
    UserModule,
    LibraryModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, LocalStrategy, JwtService, JwtStrategy],
})
export class AppModule {}
