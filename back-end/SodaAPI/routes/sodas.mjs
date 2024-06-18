import { Router } from "express";
import { SodaController } from "../controllers/soda.mjs";

export const sodasRouter = Router();
//non-modify-request
sodasRouter.get("/", SodaController.getAll);
sodasRouter.get("/:id", SodaController.getById);
//modify request
sodasRouter.post("/", SodaController.post);
sodasRouter.patch("/:id", SodaController.patch);
sodasRouter.delete("/:id", SodaController.delete);
//other
sodasRouter.use("/", SodaController.noPage);
