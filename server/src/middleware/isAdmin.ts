import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import { CustomUserReq } from "../types/types";

const isAdmin = async (
  req: CustomUserReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized access - No user found",
      });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    if (user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Forbidden - You do not have admin permissions",
      });
      return;
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while verifying admin privileges",
    });
    return;
  }
};

export default isAdmin;
