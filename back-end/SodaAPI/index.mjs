import express from "express";
import Sodas from "./responses/sodas.js";
import { ValidateSoda } from "./schemas/validate.mjs";

const app = express();
const host = 1234;

app.use(express.json());

const descriptions = {
  404: "not found",
  200: "good response",
  201: "created",
  400: "invalid values",
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

//     req.on('end', () => {
//         data = JSON.parse(data)
//         req.body = data
//         next()
//     })
// })

app.post("/sodas", (req, res, next) => {
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

app.get("/sodas/search/:name", (req, res) => {
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

app.use((req, res) => {
  res.status(404).json(AddResponseData(404, {}));
});

app.listen(host, () => {
  console.log("Server listening at host: " + host);
});
