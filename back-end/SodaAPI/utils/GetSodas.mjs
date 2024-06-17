import { createRequire } from "node:module";

const createdImport = createRequire(import.meta.url);
const Sodas = createdImport("../responses/sodas.json");

export default function GetSodas() {
  return Sodas;
}
