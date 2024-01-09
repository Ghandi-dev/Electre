import express from "express";
import {
  getCriteria,
  getCriteriaById,
  createCriteria,
  updateCriteria,
  deleteCriteria,
} from "../controllers/CriteriaController.js";

const router = express.Router();

router.get("/criteria", getCriteria);
router.get("/criteria/:id", getCriteriaById);
router.post("/criteria", createCriteria);
router.put("/criteria/:id", updateCriteria);
router.delete("/criteria/:id", deleteCriteria);

export default router;
