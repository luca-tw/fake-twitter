import { Module } from '@nestjs/common';
import { ModelsModule, UserEntity } from '@fake-twitter/models';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ModelsModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
