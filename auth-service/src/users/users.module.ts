import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'TASK_CLIENT',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`], 
            queue: 'tasks_queue',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
    },
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    
    forwardRef(()=>AuthModule)
  ],
  exports: [
    UsersService,
    'TASK_CLIENT'
  ],
})
export class UsersModule {
    
}
