import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  //app.use(helmet());
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Claspy example')
    .setDescription('The student API description')
    .setVersion('1.0')
    .addTag('student')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
