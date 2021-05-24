import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

import Student from '../model/Student.model';

import { StudentBody, StudentParams } from '../interfaces/Request/StudentRequest.interface';
import { StudentResponse } from '../interfaces/Response.interface';
import student from '../routes/student';

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
        const imagePath = path.join(__dirname, `../../../uploads/img-${student.Codigo}.jpg`);

        fs.unlinkSync(imagePath);
        await student.destroy();
        res.status(200).json({ msg: 'Student eliminated from database and its picture from server' });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}
