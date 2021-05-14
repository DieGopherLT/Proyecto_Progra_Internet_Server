import express, { Router } from 'express';

import { createStudent } from '../controller/studentController';

const router: Router = express.Router();

router.post('/', createStudent);

export default router;