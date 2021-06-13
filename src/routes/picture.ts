// import express, {Router} from 'express';
// import path from 'path';

// const router: Router = express.Router();

// router.get('/:image', (req, res) => {
//     const { params: { image } } = req;

//     try {
//         const imagePath = path.join(__dirname, `../../../uploads/${image}`);
//         res.sendFile(path.join(imagePath));
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ msg: 'Image not found' });
//     }
// });

// export default router;
