import { Request, Response } from 'express';
// import path from 'path';
// import fs from 'fs';

import Student from '../model/Student.model';

import { StudentBody, StudentParams } from '../interfaces/Request/StudentRequest.interface';
import { StudentResponse } from '../interfaces/Response.interface';
import { StudentRecord } from '../interfaces/StudentRecord.interface';
import {
    currentStudentPositionPromise, currentStudentPromise,
    currentStudentRecordPromise,
    studentRecordListPromise,
} from '../helpers/controllers/studentController.helper';
import { MergeSort } from '../helpers';

export const createStudent = async (req: Request<any, any, StudentBody>, res: Response<StudentResponse>) => {

    const { code, name } = req.body;

    try {
        const student = await Student.findByPk(code);

        if(!student) {
            await Student.create({
                Codigo: code,
                Nombre: name,
            });
            res.status(200).json({ msg: 'Student Created', studentCreated: true });
        }
        else
            res.status(200).json({ msg: 'Student already exists', studentCreated: false });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something went wrong' });
    }
};

export const deleteStudent = async (req: Request<StudentParams>, res: Response<StudentResponse>) => {
    const { params: { code } } = req;

    try {
        const student = await Student.findOne({ where: { Codigo: code }, rejectOnEmpty: true });

        // if(student.imagen.includes(student.Codigo)){
        //     const imagePath = path.join(__dirname, `../../../uploads/img-${student.Codigo}.jpg`);
        //     fs.unlinkSync(imagePath);
        // }

        await student.destroy();
        res.status(200).json({ msg: 'Student eliminated from database' });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

export const listStudentPosition = async (req: Request<StudentParams>, res: Response<StudentResponse>) => {

    const { params: { code } } = req;

    try {
        const allStudentsListPromise = Student.findAll();
        const singleStudentPromise = Student.findOne({ where: { Codigo: code } });
        let place = 1;

        const [studentList, student] = await Promise.all([allStudentsListPromise, singleStudentPromise]);
        let [studentRecordList, currentStudentRecord] = await Promise.all([
            studentRecordListPromise(studentList),
            currentStudentRecordPromise(student)
        ]);

        const sortedStudentRecordList = studentRecordList.sort((a, b) => b.speed - a.speed);
        const designatedStudentRecordList = sortedStudentRecordList.map(student => {
            if(student.student.Codigo === code)
                currentStudentRecord.place = place;
            student.place = place++;
            return student;
        });
        const firstThreeStudents = designatedStudentRecordList.slice(0, 3);

        if(firstThreeStudents.some(record => record.place === currentStudentRecord.place))
            return res.status(200).json({ positionList: firstThreeStudents });

        return res.status(200).json({
            positionList: firstThreeStudents,
            studentPlace: currentStudentRecord
        });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

export const getStudentPosition = async (req: Request<StudentParams>, res: Response<StudentResponse>) => {

    const { params: { code } } = req;

    try {
        const allStudentList = await Student.findAll();
        const allStudentsRecordList = await studentRecordListPromise(allStudentList);
        const sortedRecordStudentList = allStudentsRecordList.sort((a, b) => b.speed - a.speed);

        const [ currentStudentPlace, currentStudent ] = await Promise.all([
            currentStudentPositionPromise(sortedRecordStudentList, code),
            currentStudentPromise(sortedRecordStudentList, code)
        ]);
        const lastPlace = sortedRecordStudentList.length - 1;

        res.status(200).json({
            currentStudentPlace: currentStudentPlace + 1,
            lastPlace,
            studentPlace: currentStudent
        });

    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}
