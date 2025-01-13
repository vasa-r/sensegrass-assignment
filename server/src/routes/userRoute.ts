import express from "express";
import { CustomUserReq, statusCode } from "../types/types";
import User from "../models/userModel";
import {
  comparePassword,
  generateHashedPassword,
  generateToken,
} from "../lib/utils";
import verifyToken from "../middleware/verifyToken";

const userRouter = express.Router();

userRouter.get("/all", verifyToken, async (req, res) => {
  try {
    const users = await User.find({}).lean();

    if (!users || users.length < 1) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "No users available",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while getting users",
    });
    return;
  }
});

userRouter.get("/", verifyToken, async (req: CustomUserReq, res) => {
  try {
    const { userId } = req;
    console.log(req.userId);

    const user = await User.findById(userId);

    if (!user) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "No user found",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Users fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while getting users",
    });
    return;
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const { userName, email, role, password } = req.body;

    const isUserExists = await User.findOne({ email: email });

    if (isUserExists) {
      res.status(statusCode.CONFLICT).json({
        success: false,
        message: "User already exists please try to sign in",
      });
      return;
    }

    const hashedPassword = await generateHashedPassword(password);

    const createUser = await User.create({
      userName,
      email,
      role,
      password: hashedPassword,
    });

    res.status(statusCode.CREATED).json({
      success: true,
      message: "User creted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while registering",
    });
    return;
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(statusCode.CONFLICT).json({
        success: false,
        message: "No user found. Please Sign Up",
      });
      return;
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      res.status(statusCode.NOT_ACCEPTABLE).json({
        success: false,
        message: "Incorrect Password. Please enter correct password",
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(statusCode.ACCEPTED).json({
      success: true,
      message: "Login Successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while Logging in",
    });
    return;
  }
});

export default userRouter;
