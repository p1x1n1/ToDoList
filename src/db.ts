import {DataSource} from "typeorm";
import * as path from "path";
import {User} from "./modele";
import dotenv from 'dotenv';

dotenv.config();

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true, //синхронизация сущностей с БД
    entities: [//сущности 
        User
    ],
})

