import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { ColumnEntity } from "src/columns/column.model";


@Entity('projects')
export class Project {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Project Name', description: 'Название проекта' })
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @ApiProperty({ example: 'Project description', description: 'Описание проекта' })
    @Column({ type: 'text', nullable: true })
    description: string;

    @ApiProperty({ example: '2024-07-16T19:57:10Z', description: 'Дата и время создания' })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty({ example: '1', description: 'ID пользователя' })
    @Column({ type: 'integer', nullable: false })
    userId: number;

    @OneToMany(() => ColumnEntity, column => column.project, { cascade: true })
    columns: ColumnEntity[];
    
    user: any;
}
