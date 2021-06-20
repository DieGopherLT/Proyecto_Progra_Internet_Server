import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const studentsDb = new Sequelize({
    dialect: 'mysql',
    host: process.env.STUDENTS_DB_HOST,
    port: 3306,
    username: process.env.STUDENTS_DB_USERNAME,
    password: process.env.STUDENTS_DB_PASSWORD,
    database: process.env.STUDENTS_DB_NAME
});

export default studentsDb;
