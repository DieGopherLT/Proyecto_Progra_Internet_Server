import express, { Router } from 'express';

import { createStudent, deleteStudent, listStudentPosition } from '../controller/studentController';

const router: Router = express.Router();

router.post('/', createStudent);

router.delete('/:code', deleteStudent);

router.get('/:code', listStudentPosition);

export default router;
