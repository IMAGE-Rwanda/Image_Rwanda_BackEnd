import express from 'express'
import userController from '../controllers/userController'

const router = express();

router.post('/subscribe',userController.subscribe)

export default router