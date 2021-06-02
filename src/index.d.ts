import { JWT_PAYLOAD } from './interfaces/Student';

declare global {
    namespace NodeJS {
        interface ProcessEnv{
            DB_HOST: string;
            DB_USERNAME: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            STUDENT_TABLE: string;
        }
    }

    namespace Express{
        interface Request{
            student: JWT_PAYLOAD['student']
        }
    }
}
