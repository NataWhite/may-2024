import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    // disableErrorMessages: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Nest bonus module')
    .setDescription('The may-2024 API description')
    .setVersion('1.0')
    .addTag('okten')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, documentFactory);

  await app.listen(3001);
}
bootstrap();
