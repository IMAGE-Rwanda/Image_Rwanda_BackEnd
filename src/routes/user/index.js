import express from 'express';
import userController from '../../controllers/userController';
import {userValidation} from '../../middlewares/validation/userValidation/uservalidation';
import { verifyToken } from '../../middlewares/verification/verifyToken';
const userRouter = express.Router();

userRouter.post('/',userValidation,userController.saveNewUser);
userRouter.post('/login',userController.loginUser);
userRouter.post('/forgot-password',  userController.resetPassword);
userRouter.put('/reset-password/:token',verifyToken, userController.changePassword);
export default userRouter;