import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GenderEnum } from '@fake-twitter/models';
export class UserDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({
    type: String,
    enum: GenderEnum,
  })
  gender!: GenderEnum;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  thumbnail!: string | null;

  @ApiProperty()
  birthday!: Date | null;
}
