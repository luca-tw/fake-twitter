import { IsDate, IsDateString, IsEnum, IsMobilePhone, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GenderEnum } from '@fake-twitter/models';
import { Type } from 'class-transformer';
export class CreateUserArgsDto {
  @ApiProperty()
  @IsString()
  email!: string;

  @ApiProperty()
  @IsString()
  password!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    type: String,
    enum: GenderEnum,
  })
  @IsEnum(GenderEnum)
  gender!: GenderEnum;

  @ApiProperty()
  @IsMobilePhone('zh-TW')
  phone!: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  thumbnail?: string | null;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  birthday?: Date | null;
}
