import * as dotenv from 'dotenv';
import {DataSource} from "typeorm";
import {User} from "./src/database/entities/user.entity";
import {Post} from "./src/database/entities/post.entity";
import configuration from "./src/common/config/configuration";
import * as path from "path";
// import * as process from "process";
dotenv.config();

const postgresConfig = configuration().database;

export default new DataSource({
    type: 'postgres',
    host: postgresConfig.host,
    port: postgresConfig.port,
    username: postgresConfig.user,
    password: postgresConfig.password,
    database: postgresConfig.database,
    entities: [User, Post],
    migrations: [path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts')],
    synchronize: false,
})