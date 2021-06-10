import { Request, Response } from 'express';
import * as base64 from 'node-base64-image';

import Student from '../model/Student.model';

import { UploadParams } from '../interfaces/Request/UploadRequest.interface';
import { UploadResponse } from '../interfaces/Response.interface';

export const saveProfileImage = async (req: Request<UploadParams>, res: Response<UploadResponse>) => {
    const { params: { code }, file: { filename } } = req;

    try {
        if(filename){
            const student = await Student.findOne({ where: { Codigo: code }, rejectOnEmpty: true });
            student.imagen = `https://samdt.000webhostapp.com/imagenes/img-${ student.Codigo }.jpg`;
            await student.save();
            res.status(200).json({ msg: 'Image uploaded and database updated' });
        }
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

//Returns image in base64 format
export const getProfileImage = async (req: Request<UploadParams>, res: Response<UploadResponse>) => {

    const { code } = req.params;

    try {
        const student = await Student.findOne({ where: { Codigo: code } });
        if(student){
            if(student.imagen !== ''){
                //const path = `https://samdt.000webhostapp.com/imagenes/${student.imagen}`;

                //Si es una imagen hospedada en internet, no hace falta el protocolo file
                const imageAsBase64 = await base64.encode(`${ student.imagen }`, { string: true });
                return res.status(200).json({ img: imageAsBase64, msg: 'Take yor picture' });
            }
            else
                return res.status(404).json({ img: null, msg: 'There is no picture' });
        }
        else
            return res.status(404).json({ img: null, msg: 'There is no student' });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}
