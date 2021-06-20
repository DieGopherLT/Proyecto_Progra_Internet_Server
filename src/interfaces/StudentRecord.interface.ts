import { StudentInstance } from '../models/StudentsDatabase/Student.model';

export interface StudentRecord{
    student: StudentInstance;
    speed: number;
    place?: number;
}
