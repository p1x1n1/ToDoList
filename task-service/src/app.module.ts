import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {ConfigModule} from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColumnsModule } from './columns/columns.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from "./projects/projects.module";
import { Project } from "./projects/projects.model";
import { ColumnEntity } from "./columns/column.model";
import { Task } from "./tasks/tasks.model";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { SubtasksModule } from './subtasks/subtasks.module';
import { Subtask } from "./subtasks/subtasks.model";

@Module({
  controllers: [AppController],
  providers: [AppService], 
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env` 
    }),
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TASK_POSTGRES_HOST,
      port: Number(process.env.TASK_POSTGRES_PORT),
      username: process.env.TASK_POSTGRES_USER,
      password: process.env.TASK_POSTGRES_PASSWORD,
      database: process.env.TASK_POSTGRES_DB,
      entities: [Project,ColumnEntity,Task,Subtask],
      synchronize: true      
    }),  
    ProjectsModule,
    ColumnsModule,
    TasksModule,
    AuthModule,
    SubtasksModule,
  ],
})
export class AppModule {

}