import { forwardRef, Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects.model';
import { ColumnsModule } from 'src/columns/columns.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService,JwtAuthGuard],
  imports: [
            TypeOrmModule.forFeature([Project]),
            forwardRef(()=>ColumnsModule),
            AuthModule
          ],
            
  exports: [ProjectsService],
})
export class ProjectsModule {}
