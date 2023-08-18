import { IsDateString, IsEnum, IsMobilePhone, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GenderEnum } from '@fake-twitter/models';
export class CreateUserArgsDto {
  @ApiProperty()
  @IsString()
  email!: string;

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
  @IsDateString()
  @IsOptional()
  birthday?: string | null;
}
