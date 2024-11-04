// src/subtasks/subtask.model.ts
import { ApiProperty } from "@nestjs/swagger";
import { Task } from "src/tasks/tasks.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('subtasks')
export class Subtask {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор подзадачи' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Subtask Name', description: 'Название подзадачи' })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty({ example: 'Subtask description', description: 'Описание подзадачи' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ example: true, description: 'Статус подзадачи: завершена или нет' })
  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @ManyToOne(() => Task, task => task.subtasks, { onDelete: 'CASCADE' })
  task: Task;
}
