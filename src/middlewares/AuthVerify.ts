// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// import { AuthVerifyResponse } from '../interfaces/Response.interface';
// import { JWT_PAYLOAD } from '../interfaces/Student';

// const AuthVerify = async (req: Request, res: Response<AuthVerifyResponse>, next: NextFunction) => {

//     const token: string | undefined = req.header('x-auth-token');
//     if(!token)
//         return res.status(401).json({ msg: 'Acceso denegado' });

//     try {
//         const cipher = <JWT_PAYLOAD>jwt.verify(token, process.env.SECRET);
//         req.student = cipher.student;
//         next();
//     } catch(e) {
//         console.log(e);
//         res.status(500).json({ msg: 'Something went wrong' })
//     }

// }

// export default AuthVerify;
