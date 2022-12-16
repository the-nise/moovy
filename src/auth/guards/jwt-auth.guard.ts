import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/utils/public';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
