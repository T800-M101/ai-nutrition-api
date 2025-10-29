import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe()
  );
  
  app.setGlobalPrefix('api');
  
  // Swagger config (only for dev)
  const config = new DocumentBuilder()
    .setTitle('Ai nutrition API')
    .setDescription('API for managing ai nutrition API')
    .setVersion('1.0')
    .addTag('users')
    .addTag('meals')
    .addTag('ai')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  const PORT = process.env.PORT ?? 3000;



  await app.listen( PORT );
  console.log(`🚀 Application running on: http://localhost:${PORT}`);
  console.log(`📘 Swagger docs: http://localhost:${PORT}/api/docs`);
}
bootstrap();
