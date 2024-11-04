// src/subtasks/subtasks.controller.ts
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';



@Controller('tasks/:taskId/subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Post()
  async create(@Param('taskId') taskId: number, @Body() dto: CreateSubtaskDto) {
    return this.subtasksService.create(taskId, dto);
  }

  @Patch(':subtaskId')
  async update(
    @Param('subtaskId') subtaskId: number,
    @Body() dto: UpdateSubtaskDto
  ) {
    return this.subtasksService.update(subtaskId, dto);
  }

  @Delete(':subtaskId')
  async delete(@Param('subtaskId') subtaskId: number) {
    return this.subtasksService.delete(subtaskId);
  }
}
