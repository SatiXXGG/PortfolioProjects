import { BoxModel } from "../models/BoxModel.js";

export class BoxController {
  static async CorsMiddle(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    next();
  }

  static async get(req, res) {
    const uuid = await BoxModel.get();
    res.json({ status: "connected", id: uuid });

    console.log("response", uuid);
  }
}
