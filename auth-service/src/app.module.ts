import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';

@Module({
  imports: [
    ConfigModule.forRoot({//передаём объект содержащий информацию о
      envFilePath: `.${process.env.NODE_ENV}.env` //файл с системными переменными
    }),
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.AUTH_POSTGRES_HOST,
      port: Number(process.env.AUTH_POSTGRES_PORT),
      username: process.env.AUTH_POSTGRES_USER,
      password: process.env.AUTH_POSTGRES_PASSWORD,
      database: process.env.AUTH_POSTGRES_DB,
      entities: [User],
      synchronize: true      
    }),
    UsersModule, 
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
