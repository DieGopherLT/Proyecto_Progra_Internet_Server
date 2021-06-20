import { StudentRecord } from '../../interfaces/StudentRecord.interface';
import { StudentInstance } from '../../models/StudentsDatabase/Student.model';

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

export const currentStudentPositionPromise = (studentRecordList: StudentRecord[], code: string): Promise<number> => {
    return new Promise(resolve => {
        const currentStudentPosition = studentRecordList.findIndex(({ student }) => student.Codigo === code);
        resolve(currentStudentPosition);
    })
}

export const currentStudentPromise = (studentRecordList: StudentRecord[], code: string): Promise<StudentRecord> => {
    return new Promise((resolve, reject) => {
        const currentStudentRecord = studentRecordList.filter(({ student }) => student.Codigo === code);
        if(currentStudentRecord){
            const [ record ] = currentStudentRecord;
            resolve(record);
        }
        else
            reject('Student not found');
    })
}

export const transformDataFormat = (date: string) => {
    const split = date.split('-');
    let [day, month, year] = split;

    if(month.length === 1)
        month = `0${ month }`;
    if(day.length === 1)
        day = `0${ day }`;

    // 1988-03-21
    return `${ year }-${ month }-${ day }`;

}
