import express from "express";

import { configDotenv } from "dotenv";
import { sodasRouter } from "./routes/sodas.mjs";

configDotenv();

const app = express();
// eslint-disable-next-line no-undef
const host = process.env.PORT ?? 1234;

app.use("/sodas", sodasRouter); // ./routes/sodas.js

app.listen(host, () => {
  console.log("Server listening at host: " + host);
});
