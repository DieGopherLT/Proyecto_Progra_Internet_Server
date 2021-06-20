import { Sequelize } from 'sequelize';

const verifyDb = new Sequelize({
    dialect: 'mysql',
    host: process.env.VERIFY_DB_HOST,
    port: 3306,
    username: process.env.VERIFY_DB_USERNAME,
    password: process.env.VERIFY_DB_PASSWORD,
    database: process.env.VERIFY_DB_NAME
});

export default verifyDb;
