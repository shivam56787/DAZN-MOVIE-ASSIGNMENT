
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

export const Authorized = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;
    if (!(headers.role === 'admin')) {
      throw new UnauthorizedException('Unauthorized Access');
    }
    return headers.role;
  },
);