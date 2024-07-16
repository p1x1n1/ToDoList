import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";


@Table({tableName: 'user_roles',createdAt: false,updatedAt: false})//отключение отслеживания создания и обновления
export class UserRoles extends Model<UserRoles>{
    // @ApiProperty({example:'1',description:'Уникальный идентификатор'})
    @Column({type:DataType.INTEGER, unique:true, autoIncrement: true, primaryKey: true})
    id: number;
    
    // @ApiProperty({example:'ADMIN',description:'Значение роли пользователя'})
    @ForeignKey(()=> Role)
    @Column({type:DataType.INTEGER})
    roleId: string;
    
    // @ApiProperty({example:'Роль пользователя администратор',description:'Описание роли'})
    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER})
    userId: string;
}