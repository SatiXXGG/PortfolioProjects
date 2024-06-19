import express from "express";
import { BoxController } from "../controller/BoxController.js";
export const BoxRouter = express.Router();

BoxRouter.use("/", BoxController.CorsMiddle);
BoxRouter.get("/", BoxController.get);
