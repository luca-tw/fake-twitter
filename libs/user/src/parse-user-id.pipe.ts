import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CoreUserService } from './service/core-user.service';

@Injectable()
export class ParseUserIdPipe implements PipeTransform {
  constructor(private readonly coreUserService: CoreUserService) {}

  async transform(authToken: string, metadata: ArgumentMetadata) {
    const nullable = !!metadata.data;

    if (!authToken && nullable) return undefined;

    try {
      return this.coreUserService.verifyJWTToken(authToken, 'access');
    } catch (ex) {
      if (nullable) return undefined;

      throw ex;
    }
  }
}
