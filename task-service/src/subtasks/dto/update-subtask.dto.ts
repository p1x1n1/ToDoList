import { ApiProperty } from "@nestjs/swagger";
export class UpdateSubtaskDto {
  @ApiProperty({ example: 'Updated Subtask Name', description: 'Название подзадачи' })
  name?: string;

  @ApiProperty({ example: 'Updated Subtask description', description: 'Описание подзадачи' })
  description?: string;

  @ApiProperty({ example: true, description: 'Статус подзадачи' })
  isCompleted?: boolean;
}