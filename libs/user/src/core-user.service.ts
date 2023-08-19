import { UserEntity } from '@fake-twitter/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class CoreUserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {}

  async create(args: { email: string; password: string }, qr: QueryRunner) {
    return this.userRepo.save(
      this.userRepo.create({
        email: args.email,
        password: await argon2.hash(args.password, { type: argon2.argon2id }),
      }),
    );
  }
}
