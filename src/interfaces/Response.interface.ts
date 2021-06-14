import { StudentRecord } from './StudentRecord.interface';
import { StudentInstance } from '../model/Student.model';

export interface UploadResponse{
    msg?: string;
    img?: string | null | Buffer;
}

export interface StudentResponse{
    msg?: string;
    studentCreated?: boolean;
    positionList?: StudentRecord[];
    studentPlace?: StudentRecord | null;
    currentStudentPlace?: number;
    lastPlace?: number;
    date?: string;
}
