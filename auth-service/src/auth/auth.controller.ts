import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/login')
    login(@Body() userDto: CreateUserDto){
        console.log('login')
        return this.authService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
         return this.authService.registration(userDto);
    }

    @MessagePattern({ cmd: 'validate-token' })
    async validateToken(@Payload() token: string) {
        return this.authService.validateToken(token);
    }
    
}
