import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.deecorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService ){}
    @ApiOperation({summary:'Создание пользователя'})
    @ApiResponse({status:200, type:User })
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto:CreateUserDto){
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary:'Получение пользователей'})
    @ApiResponse({status:200, type: [User] })
    @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")//каким ролям доступен
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
            return this.usersService.getAllUsers();
    }

    @ApiOperation({summary:'Выдача ролей для пользователей'})
    @ApiResponse({status:200 })
    @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")//каким ролям доступен
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto){
            return this.usersService.addRole(dto);
    }

    @ApiOperation({summary:'Забанить пользователей'})
    @ApiResponse({status:200 })
    @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")//каким ролям доступен
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto){
            return this.usersService.ban(dto);
    }
}
