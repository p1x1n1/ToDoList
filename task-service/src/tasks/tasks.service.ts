import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.model';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { ReorderTaskDto } from './dto/reorder-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ColumnsService } from 'src/columns/columns.service';
import { AuthUserDto } from 'src/auth/user-auth.dto';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        private readonly columnService: ColumnsService,
    ){}

    async create(columnId: number, dto: CreateTaskDto) {
        const column = await this.columnService.getById(columnId);
        const task = this.taskRepository.create({...dto,column});
        return await this.taskRepository.save(task);
      }
    
      async getById(id: number) {
        return await this.taskRepository.findOne( { 
          relations: ['column','column.project', 'column.project'], 
          where: {id: id},
        });
      }

      async getByName(columnId: number, name: string) {
        return await this.taskRepository.findOne( { 
          relations: ['column','column.project'], 
          where: {
            name: name,
            column: {
              id: columnId
            }
          } 
        });
      }
    
      async getAllByColumn( columnId: number) {
        return await this.taskRepository.find({ 
          relations: ['column'],
          where: { 
            column: 
            { id: columnId } 
          }, 
          order: { order: 'ASC' }
        });
      }
    
      async update(id: number, dto: UpdateTaskDto){
        await this.taskRepository.update(id, dto);
        return await this.taskRepository.findOne( { 
          relations: ['column'], 
          where: {id: id} 
        });
      }
    
      async delete(id: number) {
        await this.taskRepository.delete(id);
      }

      async reorderTasks(reorderDto: ReorderTaskDto[], user: AuthUserDto) {
        for (const { taskId, columnId, order } of reorderDto) {
          const task = await this.getById(taskId);
          const column = await this.columnService.getById(columnId);
          if (task.column.project.userId !== user.id || column.project.userId !== user.id) {
            throw new ForbiddenException('Вы можете перемещать только свои задачи');
          }
          
          task.column = column;
          task.order = order;
          await this.taskRepository.save(task);
        }
        return await this.taskRepository.find({
          relations: ['column','column.project'], 
          where: {
            column:{
              project:{
                userId:  user.id
              }
            }
          } 
        });
    }

}
