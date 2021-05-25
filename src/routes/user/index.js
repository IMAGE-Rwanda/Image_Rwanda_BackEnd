import express from 'express';
import userController from '../../controllers/userController';
import {userValidation} from '../../middlewares/validation/userValidation/uservalidation';
import { validateToken, verifyToken } from '../../middlewares/verification/verifyToken';
const userRouter = express.Router();

userRouter.post('/signup',userValidation,userController.saveNewUser);
userRouter.post('/login',userController.loginUser);
userRouter.post('/forgot-password',  userController.resetPassword);
userRouter.put('/reset-password/:token',verifyToken, userController.changePassword);
userRouter.get('/logout/:token',verifyToken,validateToken, userController.logout);
export default userRouter;