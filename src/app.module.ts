import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configTypeORM } from './configs/typeORM/typeorm.module';
import { HttpLoggerMiddleware } from './middleware/http-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configTypeORM),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
