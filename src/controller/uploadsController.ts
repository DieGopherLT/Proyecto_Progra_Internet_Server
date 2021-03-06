import { Request, Response } from 'express';
import Student from '../models/StudentsDatabase/Student.model';

import { UploadParams } from '../interfaces/Request/UploadRequest.interface';
import { UploadResponse } from '../interfaces/Response.interface';

export const getProfileImage = async (req: Request<UploadParams>, res: Response<UploadResponse>) => {
    try {
        const { code } = req.params;
        const student = await Student.findOne({ where: { Codigo: code } });
        if(student)
            return res.status(200).json({ img: student.imagen, msg: 'Take yor picture' });
        else
            return res.status(404).json({ img: null, msg: 'There is no student' });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}
