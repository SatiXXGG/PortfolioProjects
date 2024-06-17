import express from "express";

import { ValidateSoda, validatePartialSoda } from "./schemas/validate.mjs";
import { configDotenv } from "dotenv";
import { createRequire } from "node:module";
configDotenv();

const app = express();
// eslint-disable-next-line no-undef
const host = process.env.PORT ?? 1234;

const createdImport = createRequire(import.meta.url);
const Sodas = createdImport("./responses/sodas.json");

app.use(express.json());

const descriptions = {
  404: "not found",
  200: "good response",
  201: "created",
  400: "invalid values",
  204: "no content",
};

const AddResponseData = (status, data, message) => {
  return {
    message: message ?? "N/A",
    description: descriptions[status],
    status: status,
    data: data,
    timesec: Date.now(),
  };
};

// app.use("/", (req, res, next) => {

//     if (req.method !== "POST") {return next()}
//     let data = ""

//     req.on('data', chunk => {
//         data += chunk.toString()
//     })

// //     req.on('end', () => {
//         data = JSON.parse(data)
//         req.body = data
//         next()
//     })
// })

app.post("/", (req, res) => {
  res.json(AddResponseData(204, {}, "please use /sodas"));
});

app.post("/sodas", (req, res) => {
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

app.get("/sodas", (req, res) => {
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

app.get("/sodas/:name", (req, res) => {
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

app.patch("/sodas/:id", (req, res) => {
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

app.delete("/sodas/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = Sodas.sodas.findIndex((item) => item.id === id);

  if (movieIndex > 0) {
    Sodas.sodas.splice(movieIndex, 1);
    res.status(204).json(AddResponseData(204, {}, "Deleted"));
  }
});

app.use((req, res) => {
  res.status(404).json(AddResponseData(404, {}));
});

app.listen(host, () => {
  console.log("Server listening at host: " + host);
});
