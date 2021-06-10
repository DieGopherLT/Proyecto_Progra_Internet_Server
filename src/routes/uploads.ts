import express, { Router } from 'express';
import multer from 'multer';
import storage from '../config/multer';

const upload = multer({ storage });
const router: Router = express.Router();

import {
    getProfileImage,
    saveProfileImage,
} from '../controller/uploadsController';

router.post('/:code', saveProfileImage);

router.get('/:code', getProfileImage);


export default router;
