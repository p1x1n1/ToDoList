import { Module } from '@nestjs/common';
import { SubtasksController } from './subtasks.controller';
import { SubtasksService } from './subtasks.service';
import { Subtask } from './subtasks.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Subtask]),
    TasksModule,
  ],
  controllers: [SubtasksController],
  providers: [SubtasksService]
})
export class SubtasksModule {}
