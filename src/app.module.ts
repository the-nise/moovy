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
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
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
