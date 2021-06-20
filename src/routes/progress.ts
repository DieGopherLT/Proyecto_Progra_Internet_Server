import express, { Router } from 'express';

import {
    getPendingProgressesList,
    uploadToVerify,
    updateProgress,
    resolveProgress
} from '../controller/progressController';

//  /api/progress
const router: Router = express.Router();

router.get('/', getPendingProgressesList);

router.post('/', uploadToVerify);

router.post('/update', resolveProgress, updateProgress);

export default router;
