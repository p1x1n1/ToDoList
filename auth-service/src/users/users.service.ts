import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
// import { RolesService } from 'src/roles/roles.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';



@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @Inject('TASK_CLIENT') private readonly tasksClient: ClientProxy,
    ){}
    async createUser(dto:CreateUserDto) {
        const user = this.userRepository.create(dto);
        return await this.userRepository.save(user);
      }
    

    async getAllUsers() {
        const users = await this.userRepository.find();
        return users;
    }

    async getUserByEmail(email: string){
        const user = await this.userRepository.findOne({where:{email}}) ;
        return user;
    }

    // async addRole(dto: AddRoleDto){
    //     const user = await this.userRepository.findOneBy(dto.userId);
    //     const role = await this.roleService.getRoleByValue(dto.value);
    //     if (role && user) {
    //         return await user.$add('role',role.id);//с помощью адд к инициализированной роли добавляем к массиву ещё одно значение
    //     }
    //     throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);

    // }

 
    async getUserById(id: number) {
        const user = await this.userRepository.findOneBy({id})
        const {password,...userWithoutPass} = user
        return userWithoutPass;
    }
    
    
    async updateUser(id: number, dto:CreateUserDto) {
        const user = await this.userRepository.findOneBy({ id });
            if (!user) {
                throw new NotFoundException('Пользователь не найден');
            }
            await this.userRepository.update(id, dto);
            return await this.userRepository.findOneBy({ id });
    }
    
    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }
        const task = await firstValueFrom(this.tasksClient.send({ cmd: 'delete-project-by-user' }, user.id));
        await this.userRepository.delete(id);
    }


}
