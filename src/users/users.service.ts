import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User)  private userRepository: typeof User, //внедрили модель
                private roleService: RolesService
    ){}

    async createUser(dto:CreateUserDto){
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("ADMIN");//по умолчанию
        await user.$set('roles',[role.id]);// сет позволяет перезаписать какое-то поле и сразу обновить в бд
        user.roles = [role];
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all:true}});
        return users;
    }

    async getUserByEmail(email: string){
        const user = await this.userRepository.findOne({where:{email}, include: {all:true}}) ;
        return user;
    }

    async addRole(dto: AddRoleDto){
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            return await user.$add('role',role.id);//с помощью адд к инициализированной роли добавляем к массиву ещё одно значение
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);

    }

    async ban (dto: BanUserDto){
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();//обновляем значение в бд
        return user;
    }

    async getUser(){

    }

    async updateUser(){

    }

    async deleteUser(){

    }


}
