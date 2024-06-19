import { ValidateSoda, validatePartialSoda } from "../schemas/validate.mjs";
import AddResponseData from "../utils/AddResponseData.mjs";

export class SodaController {
  constructor({ sodaModel }) {
    this.sodaModel = sodaModel;
  }

  getAll = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const { lowerto } = req.query;
    const sodas = await this.sodaModel.getAll({ lowerto });
    res.send(AddResponseData(200, sodas));
  };

  post = async (req, res) => {
    const validation = ValidateSoda(req.body);

    if (validation.error) {
      return res
        .status(400)
        .json(AddResponseData(400, {}, JSON.parse(validation.error.message)));
    }
    const soda = await this.sodaModel.create({ validation });
    if (soda) {
      res.status(201).json(AddResponseData(201, soda));
    } else {
      res.status(500).json(AddResponseData(500, {}, "Server error"));
    }
  };

  getById = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { id } = req.params;
    const soda = await this.sodaModel.getById({ id });

    if (soda) {
      res.json(AddResponseData(200, soda));
      return;
    }

    res.status(404).json(AddResponseData(404, {}));
  };

  patch = async (req, res) => {
    const validation = validatePartialSoda(req.body);
    const { id } = req.params;

    if (validation.error) {
      return res
        .status(400)
        .json(AddResponseData(400, {}, JSON.parse(validation.error.message)));
    }

    const updatedMovie = await this.sodaModel.update({ id, validation });

    if (updatedMovie) {
      return res.status(200).json(AddResponseData(200, updatedMovie));
    }

    res
      .status(404)
      .json(AddResponseData(404, {}, "We didnt find that index for you :("));
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const deleted = await this.sodaModel.delete({ id });

    if (deleted) {
      return res.status(204).json(AddResponseData(204, {}, "Deleted"));
    }

    res.status(404).json(AddResponseData(404, {}));
  };

  noPage(req, res) {
    res.status(404).json(AddResponseData(404, {}));
  }
}
