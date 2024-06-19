import { CreateApp } from "./index.mjs";
import { SodaModel } from "./models/database/mysql.mjs";
CreateApp({ sodaModel: SodaModel });
