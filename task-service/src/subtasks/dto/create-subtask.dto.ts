import { ApiProperty } from "@nestjs/swagger";

export class CreateSubtaskDto {
  @ApiProperty({ example: 'Subtask Name', description: 'Название подзадачи' })
  name: string;

  @ApiProperty({ example: 'Subtask description', description: 'Описание подзадачи' })
  description?: string;

  @ApiProperty({ example: false, description: 'Статус подзадачи' })
  isCompleted?: boolean;
}