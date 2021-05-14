import { Request, Response } from 'express';

import Student, { StudentInstance } from '../model/Student';

import { StudentParams, StudentBody } from '../interfaces/Request/StudentRequest.interface';
import { StudentResponse } from '../interfaces/Response.interface';

export const createStudent = async (req: Request<any, any, StudentBody>, res: Response<StudentResponse>) => {

    try {
        const student = await Student.findByPk(req.body.code);

        if(!student) {
            await Student.create(req.body);
            res.status(200).json({ msg: 'Student Created', studentCreated: true });
        }
        else 
            res.status(200).json({ msg: 'Student already exists', studentCreated: false });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something went wrong' });
    }
};
