import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //domain:port/api
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    origin: [process.env.CLIENT_URL],
    //enable cookies etc
    credentials: true,
    //allowed headers
    exposedHeaders: 'set-cookie',
  });
  await app.listen(process.env.API_PORT);
}
bootstrap();
