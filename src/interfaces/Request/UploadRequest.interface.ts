import { ParamsDictionary } from 'express-serve-static-core';

export interface UploadParams extends ParamsDictionary{
    code: string;
    image: string;
}
