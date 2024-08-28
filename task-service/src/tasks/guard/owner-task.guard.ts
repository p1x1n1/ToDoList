import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { TasksService } from '../tasks.service';




@Injectable()
export class TaskGuard implements CanActivate {
  constructor(
    private readonly taskService: TasksService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const taskId = request.params.id;

    const task = await this.taskService.getById(taskId);
    if (!task) {
      throw new ForbiddenException('Задачи не существует');
    }

    if (!task.column || !task.column.project ) {
      throw new ForbiddenException('Проект или пользователь не найден');
    }

    if (task.column.project.userId !== user.id) {
      throw new ForbiddenException('Не достаточно прав доступа');
    }

    return true;
  }
}
