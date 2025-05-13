import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setUpSession } from './common/setting/init.session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', 1);
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'https://localhost.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  setUpSession(app);
  app.use(function (req, res, next) {
    console.log('Request method:', req.method);
    console.log('Session ID:', req.sessionID);
    console.log('Session content:', req.session);
    next();
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
