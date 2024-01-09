import express from "express";
import {
  getSubCriteria,
  getSubCriteriaById,
  createSubCriteria,
  updateSubCriteria,
  deleteSubCriteria,
} from "../controllers/SubCriteriaController.js";

const router = express.Router();

router.get("/subcriteria", getSubCriteria);
router.get("/subcriteria/:id", getSubCriteriaById);
router.post("/subcriteria", createSubCriteria);
router.put("/subcriteria/:id", updateSubCriteria);
router.delete("/subcriteria/:id", deleteSubCriteria);

export default router;
