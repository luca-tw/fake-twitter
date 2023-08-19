import { UserEntity } from '@fake-twitter/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class CoreUserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {}

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

  async validate(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user) return null;

    if (await argon2.verify(user.password, password, { type: argon2.argon2id })) {
      return user;
    }

    return null;
  }
}
