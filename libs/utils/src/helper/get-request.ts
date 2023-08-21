import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

type RequestWithHeaderDefined = Request & { headers: { [key: string]: string } };

export const getRequest = (context: ExecutionContext): RequestWithHeaderDefined => {
  return context.getType().toString() === 'graphql'
    ? GqlExecutionContext.create(context).getContext<{ req: RequestWithHeaderDefined }>().req
    : context.switchToHttp().getRequest<RequestWithHeaderDefined>();
};
