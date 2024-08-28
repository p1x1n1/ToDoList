import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Transport, MicroserviceOptions } from '@nestjs/microservices';


async function start () {
  const PORT = process.env.TASK_SERVICE_PORT || 7000;
  const app = await NestFactory.create(AppModule);
  
   const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`], 
      queue: 'tasks_queue',          
      queueOptions: {
        durable: false,               
      },
    },
  });

 
  await app.startAllMicroservices();

  const config = new DocumentBuilder()
   .setTitle("TaskListService")
   .setDescription("Таск лист для управления задачами.")
   .setVersion("1.0")
   .addTag('p1x1n1')
   .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(PORT, () => console.log(`Starting on ${PORT}`));
}

start()
