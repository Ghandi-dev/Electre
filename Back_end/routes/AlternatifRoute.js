import express from "express";
const router = express.Router();
import {
  getAlternatif,
  getAlternatifById,
  createAlternatif,
  deleteAlternatif,
  updateAlternatif,
} from "../controllers/AlternatifController.js";

router.get("/alternatives", getAlternatif);
router.get("/alternatives/:id", getAlternatifById);
router.post("/alternatives", createAlternatif);
router.put("/alternatives/:id", updateAlternatif);
router.delete("/alternatives/:id", deleteAlternatif);

export default router;
