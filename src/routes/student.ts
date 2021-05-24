import express, { Router } from 'express';

import { createStudent, deleteStudent } from '../controller/studentController';

const router: Router = express.Router();

router.post('/', createStudent);

router.delete('/:code', deleteStudent);

export default router;