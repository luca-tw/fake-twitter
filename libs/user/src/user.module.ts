import { Module } from '@nestjs/common';
import { ModelsModule, UserEntity, UserProfileEntity } from '@fake-twitter/models';
import { CoreUserService } from './service/core-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service/user.service';

@Module({
  imports: [ModelsModule, TypeOrmModule.forFeature([UserEntity, UserProfileEntity])],
  providers: [CoreUserService, UserService],
  exports: [CoreUserService, UserService],
})
export class UserModule {}
