import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    app.enableCors({
    origin: '*', // Allow requests from any origin. Replace '*' with specific origins for better security.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Specify allowed HTTP methods.
    allowedHeaders: 'Content-Type, Accept, Authorization', // Specify allowed headers.
    credentials: true, // Enable if you need to allow credentials like cookies.
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
