import express from "express";
import {
  getValues,
  getValueById,
  createValues,
  updateValues,
} from "../controllers/ValuesController.js";
const router = express.Router();

router.get("/values", getValues);
router.get("/values/:id", getValueById);
router.post("/values/update", updateValues);
router.post("/values", createValues);

export default router;
