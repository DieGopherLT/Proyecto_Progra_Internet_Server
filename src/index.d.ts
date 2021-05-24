import { JWT_PAYLOAD } from './interfaces/Student';

declare global {
    namespace NodeJS {
        interface ProcessEnv{
            DB_HOST: string;
            DB_USERNAME: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            PORT: string | number;
        }
    }

    namespace Express{
        interface Request{
            student: JWT_PAYLOAD['student']
        }
    }
}
