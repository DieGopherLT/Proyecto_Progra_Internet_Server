import { StudentRecord } from '../../interfaces/StudentRecord.interface';
import { StudentInstance } from '../../model/Student.model';

const getStudentRecord = (student: StudentInstance): StudentRecord => {
    const seconds: number = parseInt(student.Tiempo);
    const distance: number = parseInt(student.Distancia);
    const speed: number = parseFloat((distance / seconds).toFixed(2));

    return {
        student,
        speed
    }
}

export const studentRecordListPromise = (studentList: StudentInstance[]): Promise<StudentRecord[]> => {
    let studentRecordList: StudentRecord[] = [];
    return new Promise((resolve => {
        studentList.forEach(student => {
            const record = getStudentRecord(student);
            studentRecordList = [...studentRecordList, record];
        });
        resolve(studentRecordList);
    }));
}

export const currentStudentRecordPromise = (student: StudentInstance | null): Promise<StudentRecord> => {
    return new Promise(resolve => {
        if(student){
            resolve(getStudentRecord(student));
        }
    })
}
