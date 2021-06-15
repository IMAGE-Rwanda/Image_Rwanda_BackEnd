import express from 'express'
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import userRouter from './user'
import imagesRouter from './images'
const router = express.Router();

router
  .get("/", (req, res) => {
    res.status(200).json({
      message: "welcome to Image Rwanda backend",
    });
  })
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use("/api/v1/users/", userRouter)
  .use("/api/v1/images/", imagesRouter);
  
export default router;