import { Query } from 'express-serve-static-core';

export interface ProgressQueryParams extends Query {
    code: string;
    id: string;
    resolved: '0' | '1';
}

export interface ProgressBody{
    code: string;
    name: string;
    image: string;
    distance: string;
    time: string;
}