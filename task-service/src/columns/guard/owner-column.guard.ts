import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ColumnsService } from '../columns.service';


@Injectable()
export class ColumnGuard implements CanActivate {
  constructor(
    private readonly columnService: ColumnsService,
  ) {}

  async canActivate(context: ExecutionContext){
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const columnId = request.params.id || request.params.columnId;

    const column = await this.columnService.getById(columnId);
    if (!column) {
      throw new ForbiddenException('Колонка не найдена');
    }
    console.log(column);
    if (!column.project || !column.project.userId) {
      throw new ForbiddenException('Проект или пользователь не найден');
    }

    if (column.project.userId !== user.id) {
      throw new ForbiddenException('Не достаточно доступа');
    }

    return true;
  }
}
