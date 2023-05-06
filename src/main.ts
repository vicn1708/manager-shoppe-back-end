import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Swagger } from './configs/swagger';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(
    compression({
      level: 6,
      threshold: 100 * 1000,
    }),
  );

  app.use(helmet());

  app.enableCors();

  const swagger = new Swagger();
  swagger.config(app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.log('http://localhost:3000/api');
}
bootstrap();
