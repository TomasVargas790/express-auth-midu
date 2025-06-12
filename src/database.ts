import { DataSource } from "typeorm";
import { User } from "./user";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_TYPE, DB_USER, DB_PORT } from "./config";

export const AppDataSource = new DataSource({
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false,
    logging: true,
    entities: [User],
    migrations: ['./src/migrations/*.{js,ts}'],
})

AppDataSource.initialize()