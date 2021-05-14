import { Request, Response } from 'express';
import fs from 'fs';

import Student from '../model/Student';

import { UploadParams } from '../interfaces/Request/UploadRequest.interface';
import { UploadResponse } from '../interfaces/Response.interface';


export const saveProfileImage = async (req: Request<UploadParams>, res: Response<UploadResponse>) => {

    const { params: { code } } = req;

    try {
        if(req.file){
            const student = await Student.findOne({ where: { code }, rejectOnEmpty: true });
            student.profilePicture = req.file.filename;
            await student.save();
            res.status(200).json({ msg: 'Image uploaded' });
        }
        else
            res.status(400).json({ msg: 'Did not upload.' })
    } catch(e){
        console.log(e);
        res.status(500).json({ msg: 'Something went wrong' })
    }
}

export const getProfileImage = async (req: Request<UploadParams>, res: Response<UploadResponse>) => {

    const { code } = req.params;

    try {
        const student = await Student.findOne({ where: { code } });

        if(student && student.profilePicture){
            const imageAsBase64 = fs.readFileSync(`uploads/${student.profilePicture}`, 'base64');
            return res.status(200).json({ img: imageAsBase64, msg: 'Take yor picture' });
        }
        return res.status(404).json({ img: null, msg: 'There is no picture' });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}
