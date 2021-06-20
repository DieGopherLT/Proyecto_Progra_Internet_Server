import { Query } from 'express-serve-static-core';

export interface ProgressQueryParams extends Query {
    code: string;
    id: string;
    resolved: '0' | '1';
}
