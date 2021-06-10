import express, { Router } from 'express';

import { createStudent, deleteStudent, listStudentPosition, getStudentPosition } from '../controller/studentController';

const router: Router = express.Router();

router.post('/', createStudent);

router.delete('/:code', deleteStudent);

router.get('/:code', listStudentPosition);

router.get('/places/:code', getStudentPosition);

export default router;
