import express from "express";
import imageControlller from "../controllers/imageController";

const router = express();

router.get("/search/:image", imageControlller.search);

export default router;
