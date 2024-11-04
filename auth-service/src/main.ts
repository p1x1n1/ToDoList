import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.AUTH_SERVICE_PORT || 4000;
  
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`],
      queue: 'auth_queue',
      queueOptions: {
        durable: false,
      },
    },
  });


   await app.startAllMicroservices();
  // Разрешаем CORS
  app.enableCors({
    origin: 'http://localhost:4200', //'*', // 'http://localhost:4200'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Установите true, если вы хотите разрешить отправку куки
  });
   
  
   const config = new DocumentBuilder()
     .setTitle('Auth Service')
     .setDescription('Сервис аутентификации')
     .setVersion('1.0')
     .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api/docs', app, document);
   
  await app.listen(PORT, () => console.log(`Starting on ${PORT}`));
}
bootstrap();
