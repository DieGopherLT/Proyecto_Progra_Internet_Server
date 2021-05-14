import { Request, Express } from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';

import { UploadParams } from '../interfaces/Request/UploadRequest.interface';

type File = Express.Multer.File;

const storage: StorageEngine = multer.diskStorage({
    destination: 'uploads/',
    filename: (req: Request<UploadParams>, file: File , callback) => {
        return callback(null, `${file.fieldname} - ${req.params.code}.jpg`);
    }
});

export default storage;
