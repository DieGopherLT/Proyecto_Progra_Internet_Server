import { StudentInstance } from '../model/Student.model';

export interface StudentRecord{
    student: StudentInstance;
    speed: number;
    place?: number;
}
