import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { CoreUserService } from './service/core-user.service';
import { getRequest } from '@fake-twitter/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger: Logger = new Logger(AuthGuard.name);

  constructor(private readonly coreUserService: CoreUserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = getRequest(context);
    const { authorization } = request.headers ?? {};
    const token = (authorization || '').replace(/^Bearer\s/, '');

    if (!token) return false;

    try {
      const userId = await this.coreUserService.verifyJWTToken(token, 'access');

      return !!userId;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
