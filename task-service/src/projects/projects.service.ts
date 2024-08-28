import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './projects.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import {AuthUserDto } from 'src/auth/user-auth.dto';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        @Inject('AUTH_CLIENT') private readonly authClient: ClientProxy,
    ){}

    async create(dto: CreateProjectDto) {
        const project = this.projectRepository.create(dto);
        return await this.projectRepository.save(project);
      }
    
      async getById(id: number) {
        let project = await this.projectRepository.findOne( {
        relations: [ 'columns', 'columns.tasks'],
           where: {id: id} ,
        });
        if (!project)  throw new NotFoundException(`Проект с id ${id} не найден`);
        const user = await firstValueFrom(this.authClient.send({ cmd: 'get-user-by-id' },project.userId));
        project.user = user;
        return project
      }

      async getByName(name: string,user: AuthUserDto ): Promise<Project>{
        console.log(user)
        let project = await this.projectRepository.findOne( { 
          relations: ['columns', 'columns.tasks'],
          where: {
            name: name,
            userId: user.id
          },  
        });
        if (!project)  throw new NotFoundException(`Проект с именем ${name} не найден`);
        project.user = user;
        return project
      }
    
      async getAll(user: AuthUserDto) {
        return await this.projectRepository.find({ 
          relations: ['columns', 'columns.tasks'], 
          where: {
            userId: user.id
          },
        });
      }

      async update(id: number, dto: CreateProjectDto){
        await this.projectRepository.update(id, dto);
        return await this.projectRepository.findOne( { 
          relations: [ 'columns', 'columns.tasks'],
          where: {
            id: id
          }, 
         });
      }


      async delete(id: number) {
        await this.projectRepository.delete({id});
      }

      async deleteAllUserProject(userId :number){
        return await this.projectRepository.delete(
            {userId: userId}
        );
      }

    
}
