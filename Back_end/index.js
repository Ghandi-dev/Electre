import express from "express";
import cors from "cors";
import CriteriaRoute from "./routes/CriteriaRoute.js";
import AlternatifRoute from "./routes/AlternatifRoute.js";
import SubCriteriaRoute from "./routes/SubCriteriaRoute.js";
import ValuesRoute from "./routes/ValuesRoute.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(CriteriaRoute);
app.use(AlternatifRoute);
app.use(SubCriteriaRoute);
app.use(ValuesRoute);

app.listen(3000, () => console.log("server up and running"));
