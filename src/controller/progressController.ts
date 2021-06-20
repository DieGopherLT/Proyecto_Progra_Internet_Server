import { NextFunction, Request, Response } from 'express';

import ProgressData from '../models/VerifyDatabase/ProgressData.model';
import Student from '../models/StudentsDatabase/Student.model';

import { ProgressQueryParams } from '../interfaces/Request/ProgressRequest.interface';
import { ProgressResponse } from '../interfaces/Response.interface';

export const uploadToVerify = async (req: Request, res: Response<ProgressResponse>) => {

    try {
        await ProgressData.create(req.body);
        res.status(200).json({ msg: 'Esperando aprobación' })
    }
    catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

export const resolveProgress = async (req: Request<any, any, any, ProgressQueryParams>,
                                      res: Response<ProgressResponse>,
                                      next: NextFunction) =>
{
    const { query: { id, resolved } } = req;
    try {
        const progress = await ProgressData.findByPk(id, { rejectOnEmpty: true });
        if(resolved === '0'){
            next();
        }
        else{
            await progress.destroy();
            res.status(200).json({ msg: 'La solicitud de progreso fue rechazada' });
        }
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

export const updateProgress = async (req: Request<any, any, any, ProgressQueryParams>,
                                     res: Response<ProgressResponse>) =>
{
    const { query: { id, code } } = req;
    try {
        const verifiedUserProgressPromise =  ProgressData.findOne({ where: { id }, rejectOnEmpty: true });
        const studentPromise = Student.findOne({ where: { Codigo: code }, rejectOnEmpty: true });
        const [verifiedUserProgress, student] = await Promise.all([verifiedUserProgressPromise, studentPromise]);

        const studentDistanceNumber = parseInt(student.Distancia);
        const traveledDistance = parseInt(verifiedUserProgress.distance);
        student.Distancia = (studentDistanceNumber + traveledDistance).toString();

        await Promise.all([student.save(), verifiedUserProgress.destroy()]);
        res.status(200).json({ msg: 'Progreso del estudiante actualizado' });
    } catch(e) {

    }
}

export const getPendingProgressesList = async (req: Request, res: Response<ProgressResponse>) => {
    try {
        const pendingProgressesList = await ProgressData.findAll();
        res.status(200).json({ pendingProgressesList });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}
