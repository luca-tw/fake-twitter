import { IsDate, IsEmail, IsEnum, IsMobilePhone, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GenderEnum } from '@fake-twitter/models';
import { Type } from 'class-transformer';
export class CreateUserArgsDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password!: string;

  @ApiProperty()
  @IsString()
  username!: string;

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
