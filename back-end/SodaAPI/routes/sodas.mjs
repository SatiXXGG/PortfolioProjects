import { Router } from "express";
import AddResponseData from "../utils/AddResponseData.mjs";
import { ValidateSoda, validatePartialSoda } from "../schemas/validate.mjs";
import GetSodas from "../utils/GetSodas.mjs";

const Sodas = GetSodas();
export const sodasRouter = Router();

sodasRouter.post("/", (req, res) => {
  res.json(AddResponseData(204, {}, "please use /sodas"));
});

sodasRouter.post("/", (req, res) => {
  const validation = ValidateSoda(req.body);

  if (validation.error) {
    return res
      .status(400)
      .json(AddResponseData(400, {}, JSON.parse(validation.error.message)));
  }

  const newSoda = {
    id: crypto.randomUUID(),
    ...validation.data,
  };

  Sodas.sodas.push(newSoda); //this isnt CRUD, ill add a DB later

  res.json(AddResponseData(201, newSoda));
});

sodasRouter.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { lowerto } = req.query;

  if (lowerto) {
    const filteredSodas = Sodas.sodas.filter((item) => {
      const itemPrice = item.price;

      if (itemPrice < lowerto) {
        return true;
      }
      return false;
    });

    res.send(AddResponseData(200, filteredSodas));
    return;
  }

  res.send(AddResponseData(200, Sodas));
});

sodasRouter.get("/:name", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { name } = req.params;
  const newJson = Sodas.sodas.filter((item) => {
    if (item.name.toLowerCase().includes(name.toLowerCase()) === true) {
      return true;
    }
    return false;
  });

  if (newJson.length > 0) {
    res.json(AddResponseData(200, newJson));
    return;
  }
  res.json(AddResponseData(404, {}));
});

sodasRouter.patch("/:id", (req, res) => {
  const validation = validatePartialSoda(req.body);
  const { id } = req.params;

  if (validation.error) {
    return res
      .status(400)
      .json(AddResponseData(400, {}, JSON.parse(validation.error.message)));
  }

  const index = Sodas.sodas.findIndex((item) => item.id == id);

  if (index > 0) {
    const movie = Sodas.sodas[index];
    const newMovie = {
      ...movie,
      ...validation,
    };

    Sodas.sodas[index] = newMovie;

    return res.status(200).json(AddResponseData(200, newMovie));
  } else {
    return res
      .status(404)
      .json(AddResponseData(404, {}, "We didnt find that index for you :("));
  }
});

sodasRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = Sodas.sodas.findIndex((item) => item.id === id);

  if (movieIndex > 0) {
    Sodas.sodas.splice(movieIndex, 1);
    res.status(204).json(AddResponseData(204, {}, "Deleted"));
  }
});

sodasRouter.use((req, res) => {
  res.status(404).json(AddResponseData(404, {}));
});
