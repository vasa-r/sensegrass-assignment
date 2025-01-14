import express from "express";
import verifyToken from "../middleware/verifyToken";
import isAdmin from "../middleware/isAdmin";
import validateField from "../middleware/validateNewField";
import {
  createField,
  deleteField,
  getAllFields,
  getField,
  getUserFields,
  updateField,
} from "../controllers/fieldController";

const fieldRouter = express.Router();

// to get all the fields data in db - admin route
fieldRouter.get("/all", isAdmin, getAllFields);

// to get all the fields that belongs to particular user
fieldRouter.get("/", getUserFields);

// to get single field data
fieldRouter.get("/:id", getField);

// create new field
fieldRouter.post("/create", validateField, createField);

// update existing field
fieldRouter.put("/update/:id", updateField);

// delete Field data
fieldRouter.delete("/delete/:id", deleteField);

export default fieldRouter;
