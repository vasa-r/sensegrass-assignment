import express from "express";
import verifyToken from "../middleware/verifyToken";
import verifyAdminRegister from "../middleware/verifyAdminRegister";
import isAdmin from "../middleware/isAdmin";
import {
  getAllUser,
  getUser,
  registerUser,
  loginUser,
  deleteUser,
} from "../controllers/userController";

const userRouter = express.Router();

// admin can see all the user
userRouter.get("/all", verifyToken, isAdmin, getAllUser);

// getting single user detail
userRouter.get("/", verifyToken, getUser);

// register new user
userRouter.post("/register", verifyAdminRegister, registerUser);

// login user
userRouter.post("/login", loginUser);

//  delete user
userRouter.delete("/:id", verifyToken, isAdmin, deleteUser);

export default userRouter;
