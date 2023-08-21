/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { BadRequestException, Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
      exceptionFactory: (errors) => {
        const messageFlatter = (errs: ValidationError[]) =>
          errs.reduce<string[]>((messages, { constraints, children }) => {
            if (constraints) {
              Object.keys(constraints).forEach((key) => {
                messages.push(`[${key}] ${constraints[key]}`);
              });
            }

            if (children) {
              messages.push(...messageFlatter(children));
            }

            return messages;
          }, []);

        if (errors.length > 0) {
          throw new BadRequestException(messageFlatter(errors).join('\n'));
        }
      },
    }),
  );

  const config = new DocumentBuilder().setTitle('Fake Twitter API').setVersion('0.1').addBearerAuth({
    type: 'http',
    name: 'Authorization',
    in: 'header',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  });
  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`🚀 Swagger is running on: http://localhost:${port}/docs`);
}

bootstrap();
