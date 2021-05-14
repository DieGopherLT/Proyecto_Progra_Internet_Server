import { JWT_PAYLOAD } from './interfaces/Student';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SECRET: string;
        }
    }

    namespace Express{
        interface Request{
            student: JWT_PAYLOAD['student']
        }
    }
}
