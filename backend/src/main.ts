import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AllExceptionsFilter } from './filters/exceptions.filter';
import { ValidationPipe } from '@nestjs/common';

import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  app.use(compression());

  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(helmet.noSniff());

  app.use(bodyParser.urlencoded({ extended: true, limit: '8mb' }));
  app.use(bodyParser.json({ limit: '8mb' }));

  const options = new DocumentBuilder()
    .setTitle('APP API')
    .setDescription('APP API description')
    .setVersion('1.0')
    .addTag('weather')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
