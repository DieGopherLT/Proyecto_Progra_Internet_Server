import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const db = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export default db;
