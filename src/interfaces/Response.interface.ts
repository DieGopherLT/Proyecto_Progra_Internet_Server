import { StudentRecord } from './StudentRecord.interface';
import { ProgressDataInstance } from '../models/VerifyDatabase/ProgressData.model';

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

export interface ProgressResponse{
    msg?: string;
    pendingProgressesList?: ProgressDataInstance[];
}
