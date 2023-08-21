import { UserProfileEntity } from '@fake-twitter/models';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CoreUserService } from './core-user.service';
import { CreateUserArgsDto } from '../dto/create-user-args.dto';
import { LoginUserArgsDto } from '../dto/login-user-args.dto';
import { JwtTokenDto } from '../dto/jwt-token.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(UserProfileEntity) private readonly userProfileRepo: Repository<UserProfileEntity>,
    private readonly coreUserService: CoreUserService,
  ) {}

  async findById(id: string) {
    const user = await this.userProfileRepo.findOne({ where: { id }, relations: { user: true } });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

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
          username: args.username.trim(),
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
    const user = await this.coreUserService.validateUser(args.email, args.password);

    if (!user) {
      throw new BadRequestException();
    }

    return this.coreUserService.generateJWTToken(user);
  }
}
