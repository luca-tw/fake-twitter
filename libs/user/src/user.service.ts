import { UserProfileEntity } from '@fake-twitter/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CoreUserService } from './core-user.service';
import { CreateUserArgsDto } from './dto/create-user-args.dto';
import { LoginUserArgsDto } from './dto/login-user-args.dto';
import { JwtTokenDto } from './dto/jwt-token.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private config: ConfigService,
    private readonly dataSource: DataSource,
    @InjectRepository(UserProfileEntity) private readonly userProfileRepo: Repository<UserProfileEntity>,
    private readonly coreUserService: CoreUserService,
  ) {}

  async register(args: CreateUserArgsDto) {
    const existedUser = await this.coreUserService.findByEmail(args.email);
    if (existedUser) {
      throw new BadRequestException('email already exists');
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.coreUserService.create(
        {
          email: args.email.trim(),
          password: args.password,
        },
        queryRunner,
      );

      const userProfile = await queryRunner.manager.getRepository(UserProfileEntity).save(
        this.userProfileRepo.create({
          user,
          name: args.name.trim(),
          phone: args.phone.trim(),
          birthday: args.birthday,
          gender: args.gender,
        }),
      );

      await queryRunner.commitTransaction();

      return userProfile;
    } catch (ex) {
      await queryRunner.rollbackTransaction();
      throw ex;
    } finally {
      await queryRunner.release();
    }
  }

  async login(args: LoginUserArgsDto): Promise<JwtTokenDto> {
    const user = await this.coreUserService.validate(args.email, args.password);

    if (!user) {
      throw new BadRequestException();
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
      },
      this.config.get('AUTH_JWT_ACCESS_SECRET')!,
      {
        expiresIn: this.config.get('AUTH_JWT_ACCESS_EXPIRES_IN'),
      },
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
      },
      this.config.get('AUTH_JWT_REFRESH_SECRET')!,
      {
        expiresIn: this.config.get('AUTH_JWT_REFRESH_EXPIRES_IN'),
      },
    );

    return {
      id: user.id,
      accessToken,
      refreshToken,
    };
  }
}
