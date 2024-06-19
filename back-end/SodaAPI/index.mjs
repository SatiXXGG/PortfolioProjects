import express from "express";

import { configDotenv } from "dotenv";
import { createSodaRouter } from "./routes/sodas.mjs";

configDotenv();

export function CreateApp({ sodaModel }) {
  const sodasRouter = createSodaRouter({ sodaModel });
  const app = express();
  app.use(express.json());
  app.disable("x-powered-by");
  // eslint-disable-next-line no-undef
  const host = process.env.PORT ?? 1234;

  app.use("/sodas", sodasRouter); // ./routes/sodas.js

  app.listen(host, () => {
    console.log(`Server listening at host: http://localhost:${host}`);
  });
}
