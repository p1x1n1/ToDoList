import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class AuthUserDto{
    @ApiProperty({example:'1',description:'Уникальная идентификатор пользователя'})
    @IsNumber()
    readonly id: number;

    
    @ApiProperty({example:'1@mail.ru',description:'Уникальная почта пользователя'})
    @IsString({message:"Должно быть строкой"})
    @IsEmail({},{message:'Неверный формат email'})
    readonly email: string;
    
    
}