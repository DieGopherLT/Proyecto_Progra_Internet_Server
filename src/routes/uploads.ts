import express, { Router } from 'express';
import multer, { Multer } from 'multer';

import storage from '../config/Multer';

const router: Router = express.Router();
const upload: Multer = multer({ storage });

import { saveProfileImage, getProfileImage } from '../controller/uploadsController';

router.post('/:code',
    upload.single('img'),
    saveProfileImage
);

router.get('/:code',
    getProfileImage
);

export default router;
