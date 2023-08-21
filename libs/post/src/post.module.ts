import { Module } from '@nestjs/common';
import { CommentEntity, ModelsModule, PostEntity } from '@fake-twitter/models';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ModelsModule, TypeOrmModule.forFeature([PostEntity, CommentEntity])],
  providers: [],
  exports: [],
})
export class PostModule {}
