import express, { Application } from 'express';
import cors from 'cors';

import studentsDb from './database/studentsDb';
import verifyDb from './database/verifyDb';

//Models
import '../models/StudentsDatabase/Student.model';
import '../models/VerifyDatabase/ProgressData.model';

//Routing
import UploadRouter from '../routes/uploads';
import StudentRouter from '../routes/student';
import ProgressRouter from '../routes/progress';

class Server{

    private readonly app: Application
    private readonly apiPaths = {
        upload: '/api/upload',
        student: '/api/student',
        progress: '/api/progress'
    }

    constructor(){
        this.app = express();

        this.connectDatabases();
        this.middlewares();
        this.routes();
    }

     private async connectDatabases(){
        try {
            await studentsDb.authenticate({ logging: false });
            console.log('Students database connected');
            await verifyDb.authenticate({ logging: false });
            console.log('Verify database connected');
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
        this.app.use(this.apiPaths.progress, ProgressRouter);
    }

    start(){
        // @ts-ignore
        const PORT = process.env.PORT || 4000;
        this.app.listen(PORT, () => {
            console.log(`Server working on port ${PORT}`);
        });
    }

}

export default Server;
