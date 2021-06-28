import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const studentsDb = new Sequelize({
    dialect: 'mysql',
    host: process.env.STUDENTS_DB_HOST || 'localhost',
    port: 3306,
    username: process.env.STUDENTS_DB_USERNAME || 'root',
    password: process.env.STUDENTS_DB_PASSWORD || 'root',
    database: process.env.STUDENTS_DB_NAME || 'actividad-siete'
});

export default studentsDb;
