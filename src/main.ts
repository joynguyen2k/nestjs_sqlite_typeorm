import { LoggerService, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle(`Test API`)
    .setDescription(`The official API documentation for building Test Api`)
    .setVersion('1.0')
    // .addServer(`process.env.BACKEND_URL`)
    .addBearerAuth({ type: 'apiKey', name: 'Authorization', in: 'header' })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  // Use global validation pipe.
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
