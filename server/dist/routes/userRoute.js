"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const verifyAdminRegister_1 = __importDefault(require("../middleware/verifyAdminRegister"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
// admin can see all the user
userRouter.get("/all", verifyToken_1.default, isAdmin_1.default, userController_1.getAllUser);
// getting single user detail
userRouter.get("/", verifyToken_1.default, userController_1.getUser);
// register new user
userRouter.post("/register", verifyAdminRegister_1.default, userController_1.registerUser);
// login user
userRouter.post("/login", userController_1.loginUser);
//  delete user
userRouter.delete("/:id", verifyToken_1.default, isAdmin_1.default, userController_1.deleteUser);
exports.default = userRouter;
