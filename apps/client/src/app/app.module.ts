import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import fs from 'fs';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: config.get('POSTGRES_PORT'),
        database: config.get('POSTGRES_DATABASE'),
        username: config.get('POSTGRES_USERNAME'),
        password: config.get('POSTGRES_PASSWORD'),
        schema: config.get('POSTGRES_SCHEMA'),
        logger: 'advanced-console',
        logging: config.get('TYPEORM_LOGGING') === 'true',
        autoLoadEntities: true,
        migrationsRun: config.get('TYPEORM_MIGRATIONS_RUN') === 'true',
        synchronize: config.get('TYPEORM_SYNCHRONIZE') === 'true',
        maxQueryExecutionTime: 200,
        ssl: {
          ca: fs.readFileSync('ap-southeast-2-bundle.pem').toString(),
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
