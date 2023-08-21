import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getRequest } from '@fake-twitter/utils';
import { ParseUserIdPipe } from './parse-user-id.pipe';

const TT = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = getRequest(context);
  const { authorization } = request.headers ?? {};
  const token = (authorization || '').replace(/^Bearer\s/, '');

  return token;
});

export const UserId = () => TT(ParseUserIdPipe);
