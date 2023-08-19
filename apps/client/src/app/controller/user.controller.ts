import { CreateUserArgsDto, LoginUserArgsDto, UserService } from '@fake-twitter/user';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
