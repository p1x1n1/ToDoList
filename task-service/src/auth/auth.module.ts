import { Module, Global } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Global()
@Module({
  providers: [
    {
      provide: 'AUTH_CLIENT',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`], 
            queue: 'auth_queue',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
    },
  ],
  exports: ['AUTH_CLIENT'],  
})
export class AuthModule {}
