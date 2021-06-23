import express, { Router } from 'express';

const router: Router = express.Router();

import { getProfileImage } from '../controller/uploadsController';

router.get('/:code', getProfileImage);

export default router;
