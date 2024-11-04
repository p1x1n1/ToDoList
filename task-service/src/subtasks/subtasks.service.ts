// src/subtasks/subtasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksService } from 'src/tasks/tasks.service';
import { Subtask } from './subtasks.model';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

@Injectable()
export class SubtasksService {
  constructor(
    @InjectRepository(Subtask)
    private readonly subtaskRepository: Repository<Subtask>,
    private readonly tasksService: TasksService,
  ) {}

  async create(taskId: number, dto: CreateSubtaskDto) {
    const task = await this.tasksService.getById(taskId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const subtask = this.subtaskRepository.create({ ...dto, task });
    return await this.subtaskRepository.save(subtask);
  }

  async update(subtaskId: number, dto: UpdateSubtaskDto) {
    await this.subtaskRepository.update(subtaskId, dto);
    return await this.subtaskRepository.findOne({ where: { id: subtaskId } });
  }

  async delete(subtaskId: number) {
    await this.subtaskRepository.delete(subtaskId);
  }
}
