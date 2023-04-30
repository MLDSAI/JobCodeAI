import { DataSourceOptions } from "typeorm";
import { Job } from "../entities/job"

export const dataSource: DataSourceOptions = {
    type: 'mysql',
    host: process.env.MYSQL_SERVER ?? "marriott-hr-hackathon.cv4cc3wqxhpc.us-west-1.rds.amazonaws.com",
    port: parseInt(process.env.MYSQL_PORT ?? "3306"),
    username: process.env.MYSQL_USERNAME ?? "admin",
    password: process.env.MYSQL_PWD ?? "TylersCliffNotes2023#",
    database: process.env.MYSQL_SCHEMA ?? "hackathon",
    entities: [Job],
    synchronize: true,
}