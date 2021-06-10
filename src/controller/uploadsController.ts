import { Request, Response } from 'express';

import Student from '../model/Student.model';

import { UploadParams } from '../interfaces/Request/UploadRequest.interface';
import { UploadResponse } from '../interfaces/Response.interface';

export const saveProfileImage = async (req: Request<UploadParams>, res: Response<UploadResponse>) => {
    const { params: { code } } = req;

    try {
        const student = await Student.findOne({ where: { Codigo: code }, rejectOnEmpty: true });
        student.imagen = `https://samdt.000webhostapp.com/imagenes/img-${ student.Codigo }.jpg`;
        await student.save();
        res.status(200).json({ msg: 'Database updated' });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something went wrong' });
    }
};

export const getProfileImage = async (req: Request<UploadParams>, res: Response<UploadResponse>) => {

    const { code } = req.params;

    try {
        const student = await Student.findOne({ where: { Codigo: code } });
        if(student) {
            if(student.imagen !== '') {
                return res.status(200).json({ img: student.imagen, msg: 'Take yor picture' });
            }
            else {
                return res.status(404).json({ img: null, msg: 'There is no picture' });
            }
        }
        else {
            return res.status(404).json({ img: null, msg: 'There is no student' });
        }
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}
