import { JWT_PAYLOAD } from './interfaces/Student';

declare global {
    namespace NodeJS {
        interface ProcessEnv{
            STUDENTS_DB_HOST: string;
            STUDENTS_DB_USERNAME: string;
            STUDENTS_DB_PASSWORD: string;
            STUDENTS_DB_NAME: string;
            STUDENT_TABLE: string;

            VERIFY_DB_HOST: string;
            VERIFY_DB_USERNAME: string;
            VERIFY_DB_PASSWORD: string;
            VERIFY_DB_NAME: string;

        }
    }

    namespace Express{
        interface Request{
            student: JWT_PAYLOAD['student']
        }
    }
}
