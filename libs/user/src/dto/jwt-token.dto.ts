import { ApiProperty } from '@nestjs/swagger';
export class JwtTokenDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;
}
