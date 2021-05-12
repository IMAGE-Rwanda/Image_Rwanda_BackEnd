import express from 'express'
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
const router = express.Router();

router
    .get("/", (req, res) => {
        res.status(200).json({
            message: "welcome to Image Rwanda backend",
        });
    })
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  
export default router;