import { UserEntity } from '@fake-twitter/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtTokenDto } from '../dto/jwt-token.dto';

@Injectable()
export class CoreUserService {
  constructor(
    private config: ConfigService,
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async create(args: { email: string; password: string }, qr: QueryRunner) {
    return this.userRepo.save(
      this.userRepo.create({
        email: args.email,
        password: await argon2.hash(args.password, { type: argon2.argon2id }),
      }),
    );
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user) return null;

    if (await argon2.verify(user.password, password, { type: argon2.argon2id })) {
      return user;
    }

    return null;
  }

  async generateJWTToken(user: UserEntity): Promise<JwtTokenDto> {
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
      },
      this.config.get('AUTH_JWT_REFRESH_SECRET')!,
      {
        expiresIn: this.config.get('AUTH_JWT_REFRESH_EXPIRES_IN'),
      },
    );
    jwt.verify;

    return {
      id: user.id,
      accessToken,
      refreshToken,
    };
  }

  async verifyJWTToken(token: string, type: 'access' | 'refresh'): Promise<string | undefined> {
    try {
      const payload = jwt.verify(token, this.config.get('AUTH_JWT_ACCESS_SECRET')!) as { id: string };

      return payload.id;
    } catch (error) {
      return undefined;
    }
  }
}
