import { forwardRef, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.model';
import { ColumnsModule } from 'src/columns/columns.module';
import { TaskGuard } from './guard/owner-task.guard';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Module({
  providers: [TasksService, TaskGuard,JwtAuthGuard],
  controllers: [TasksController],
  imports: [
    TypeOrmModule.forFeature([Task]),
    forwardRef(()=>ColumnsModule),
    AuthModule
  ],
  exports: [TasksService],
})
export class TasksModule {}
