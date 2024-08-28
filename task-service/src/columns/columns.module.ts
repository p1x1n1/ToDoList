import { forwardRef, Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './column.model';
import { ProjectsModule } from 'src/projects/projects.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  providers: [ColumnsService,JwtAuthGuard],
  controllers: [ColumnsController],
  imports: [
    TypeOrmModule.forFeature([ColumnEntity]),
    forwardRef(()=>ProjectsModule),
    forwardRef(()=>TasksModule),
    AuthModule
  ],
  exports: [
    ColumnsService
  ],
})
export class ColumnsModule {}
