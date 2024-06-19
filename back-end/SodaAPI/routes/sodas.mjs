import { Router } from "express";
import { SodaController } from "../controllers/soda.mjs";

export const sodasRouter = Router();

export function createSodaRouter({ sodaModel }) {
  const controller = new SodaController({ sodaModel: sodaModel });

  //non-modify-request
  sodasRouter.get("/", controller.getAll);
  sodasRouter.get("/:id", controller.getById);
  //modify request
  sodasRouter.post("/", controller.post);
  sodasRouter.patch("/:id", controller.patch);
  sodasRouter.delete("/:id", controller.delete);
  //other
  sodasRouter.use("/", controller.noPage);

  //non-modify-request
  sodasRouter.get("/", controller.getAll);
  sodasRouter.get("/:id", controller.getById);
  //modify request
  sodasRouter.post("/", controller.post);
  sodasRouter.patch("/:id", controller.patch);
  sodasRouter.delete("/:id", controller.delete);
  //other
  sodasRouter.use("/", controller.noPage);

  return sodasRouter;
}
