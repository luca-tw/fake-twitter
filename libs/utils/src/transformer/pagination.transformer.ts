import { PipeTransform } from '@nestjs/common';
import { isNil } from 'lodash';
import { LimitDefaultValue, OffsetDefaultValue, PaginationDto } from '../dtos/pagination.dto';

interface OriginParams {
  limit?: number;
  offset?: number;
}

export class PaginationTransformer implements PipeTransform {
  transform(value: OriginParams): PaginationDto {
    return {
      limit:
        (isNil(value.limit) ? null : Number.isNaN(Number(value.limit)) ? null : Number(value.limit)) ||
        LimitDefaultValue,
      offset:
        (isNil(value.offset) ? null : Number.isNaN(Number(value.offset)) ? null : Number(value.offset)) ||
        OffsetDefaultValue,
    };
  }
}
