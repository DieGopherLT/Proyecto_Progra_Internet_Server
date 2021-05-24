import express, { Application } from 'express';
import cors from 'cors';

import db from './db';

//Models
import '../model/Student.model';

//Routing
import UploadRouter from '../routes/uploads';
import StudentRouter from '../routes/student';
import PicturesRouter from '../routes/picture';

class Server{

    private readonly app: Application
    private readonly apiPaths = {
        upload: '/api/upload',
        student: '/api/student',
        pictures: '/pictures'
    }

    constructor(){
        this.app = express();

        this.connectDatabase();
        this.middlewares();
        this.routes();
    }

     private async connectDatabase(){
        try {
            await db.authenticate({ logging: false });
            console.log('Database connected');
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }

    private middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    private routes(){
        this.app.get('/', (req, res) => res.send('Server working'));
        this.app.use(this.apiPaths.upload, UploadRouter);
        this.app.use(this.apiPaths.student, StudentRouter);
        this.app.use(this.apiPaths.pictures, PicturesRouter);
    }

    start(){
        // @ts-ignore
        const PORT = process.env.PORT | 4000;
        this.app.listen(PORT, () => {
            console.log(`Server working on port ${PORT}`);
        });
    }

}

export default Server;
