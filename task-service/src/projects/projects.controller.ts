import { Body, Controller, Delete, ForbiddenException, Get, Inject, Param, Post, Put, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Project } from './projects.model';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProjectGuard } from './guard/owner-project.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';


@ApiTags('Проекты')
@Controller('projects')
export class ProjectsController {
    constructor(
      private projectService: ProjectsService ,
     
    ){}

    @ApiOperation({summary:'Создание проекта'})
    @ApiResponse({status:200, type: Project })
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() dto: CreateProjectDto, @Req() req: any) {
      const user = req.user;
      return this.projectService.create({ ...dto, userId: user.id });
    }
    
    @ApiOperation({summary:'Поиск проекта по id'})
    @ApiResponse({status:200, type: Project })
    @UseGuards(JwtAuthGuard, ProjectGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
      return this.projectService.getById(id);
    }

    @ApiOperation({summary:'Поиск проекта по названию'})
    @ApiResponse({status:200, type: Project })
    @UseGuards(JwtAuthGuard)
    @Get('/name/:name')    
    async getByName(@Param('name') name: string,@Req() req: any) {
      const user = req.user;
      return this.projectService.getByName(name, user);
    }
    
    @ApiOperation({summary:'Получение всех проектов пользователя'})
    @UseGuards(JwtAuthGuard, ProjectGuard)
    @ApiResponse({status:200, type: [Project] })
    @Get()
    async getAll(@Req() req: any) {
      const user = req.user;
      return this.projectService.getAll(user);
    }
  
    @ApiOperation({summary:'Обновление данных о проекте по id'})
    @UseGuards(JwtAuthGuard, ProjectGuard)
    @ApiResponse({status:200, type: Project })
    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: CreateProjectDto){
      return this.projectService.update(id, dto);
    }

    @ApiOperation({summary:'Обновление данных о проекте по названию'})
    @UseGuards(JwtAuthGuard)
    @ApiResponse({status:200, type: Project })
    @Put('/name/:name')
    async updateByName(@Param('name') name: string, @Body() dto: CreateProjectDto, @Req() req: any) {
      const user = req.user;
      const id = (await this.projectService.getByName(name, user)).id;
      if (id) return this.update(id, dto);
      else throw new ForbiddenException('Проект не найден');
    }
  
    @ApiOperation({summary:'Удаление проекта по id'})
    @UseGuards(JwtAuthGuard,ProjectGuard)
    @ApiResponse({status:200, type: Project })
    @Delete(':id')
    async delete(@Param('id') id: number){
      return this.projectService.delete(id);
    }

    @ApiOperation({summary:'Удаление проекта по названию'})
    @UseGuards(JwtAuthGuard)
    @ApiResponse({status:200, type: Project })
    @Delete('/name/:name')
    async deleteByName(@Param('name') name: string,@Req() req: any) {
      const user = req.user;
      const id = (await this.projectService.getByName(name, user)).id;
      if(id)      return this.delete(id);
      else throw new ForbiddenException('Проект не найден');
    }

    @MessagePattern({ cmd: 'delete-project-by-user' })
    async deleteAllUserProject(@Payload() userId: number){
      return await this.projectService.deleteAllUserProject(userId);
    }

    
}
