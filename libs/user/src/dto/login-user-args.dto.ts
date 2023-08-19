import { PickType } from '@nestjs/swagger';
import { CreateUserArgsDto } from './create-user-args.dto';

export class LoginUserArgsDto extends PickType(CreateUserArgsDto, ['email', 'password']) {}
