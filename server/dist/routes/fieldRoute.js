"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const validateNewField_1 = __importDefault(require("../middleware/validateNewField"));
const fieldController_1 = require("../controllers/fieldController");
const fieldRouter = express_1.default.Router();
// to get all the fields data in db - admin route
fieldRouter.get("/all", isAdmin_1.default, fieldController_1.getAllFields);
// to get all the fields that belongs to particular user
fieldRouter.get("/", fieldController_1.getUserFields);
// to get single field data
fieldRouter.get("/:id", fieldController_1.getField);
// create new field
fieldRouter.post("/create", validateNewField_1.default, fieldController_1.createField);
// update existing field
fieldRouter.put("/update/:id", fieldController_1.updateField);
// delete Field data
fieldRouter.delete("/delete/:id", fieldController_1.deleteField);
exports.default = fieldRouter;
