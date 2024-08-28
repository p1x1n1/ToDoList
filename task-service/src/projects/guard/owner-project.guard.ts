import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ProjectsService } from '../projects.service';


@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(
    private readonly projectService: ProjectsService,
  ) {}

  async canActivate(context: ExecutionContext){
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const projectId = request.params.id || request.params.projectId;
    // console.log(user,projectId)

    if (projectId) {
    const project = await this.projectService.getById(projectId);
    if (!project) {
      throw new ForbiddenException('Проект не найден');
    }

    if (project.userId !== user.id) {
      throw new ForbiddenException('Не достаточно прав');
    }}

    return true;
  }
}
