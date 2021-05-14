import express, { Application } from 'express';

import db from './db';

//Models
import '../model/Student';

//Routing
import UploadRouter from '../routes/uploads';
import StudentRouter from '../routes/student';

class Server{

    private readonly app: Application
    private readonly apiPaths = {
        upload: '/api/upload',
        auth: 'api/auth',
        student: '/api/student'
    }

    constructor(){
        this.app = express();

        this.connectDatabase();
        this.middlewares();
        this.routes();
    }

    async connectDatabase(){
        try {
            await db.sync({ logging: false });
            console.log('Database connected');
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    routes(){
        this.app.use(this.apiPaths.upload, UploadRouter);
        this.app.use(this.apiPaths.student, StudentRouter);
    }

    start(){
        const PORT = '4000';
        this.app.listen(PORT, () => {
            console.log(`Server working on port ${PORT}`);
        })
    }

}

export default Server;
