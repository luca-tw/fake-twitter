import { AuthGuard, CreateUserArgsDto, LoginUserArgsDto, UserDto, UserId, UserService } from '@fake-twitter/user';
import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiProperty()
  @ApiOperation({ summary: '會員資料' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/me')
  async me(@UserId() userId: string): Promise<UserDto> {
    if (!userId) {
      throw new BadRequestException();
    }

    const userProfile = await this.userService.findById(userId);
    const user: UserDto = {
      id: userProfile.id,
      email: userProfile.user.email,
      name: userProfile.name,
      gender: userProfile.gender,
      phone: userProfile.phone,
      thumbnail: userProfile.thumbnail,
      birthday: userProfile.birthday,
    };

    return user;
  }

  @ApiProperty()
  @ApiOperation({ summary: '會員註冊' })
  @Post('/')
  async register(@Body() args: CreateUserArgsDto) {
    return this.userService.register(args);
  }

  @ApiProperty()
  @ApiOperation({ summary: '會員登入' })
  @Post('/login')
  login(@Body() args: LoginUserArgsDto) {
    return this.userService.login(args);
  }
}
