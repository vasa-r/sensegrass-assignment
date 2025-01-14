"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const types_1 = require("../types/types");
const userModel_1 = __importDefault(require("../models/userModel"));
const utils_1 = require("../lib/utils");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const verifyAdminRegister_1 = __importDefault(require("../middleware/verifyAdminRegister"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const userRouter = express_1.default.Router();
userRouter.get("/all", verifyToken_1.default, isAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find({}).lean();
        if (!users || users.length < 1) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "No users available",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Users fetched successfully",
            users,
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while getting users",
        });
        return;
    }
}));
userRouter.get("/", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req;
        console.log(req.userId);
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "No user found",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Users fetched successfully",
            user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while getting users",
        });
        return;
    }
}));
userRouter.post("/register", verifyAdminRegister_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, role, password } = req.body;
        const isUserExists = yield userModel_1.default.findOne({ email: email });
        if (isUserExists) {
            res.status(types_1.statusCode.CONFLICT).json({
                success: false,
                message: "User already exists please try to sign in",
            });
            return;
        }
        const hashedPassword = yield (0, utils_1.generateHashedPassword)(password);
        const createUser = yield userModel_1.default.create({
            userName,
            email,
            role,
            password: hashedPassword,
        });
        res.status(types_1.statusCode.CREATED).json({
            success: true,
            message: `${createUser.role === "admin"
                ? "You are now authorized admin"
                : "You are now proud farmlytics farmer"}`,
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while registering",
        });
        return;
    }
}));
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email: email });
        if (!user) {
            res.status(types_1.statusCode.CONFLICT).json({
                success: false,
                message: "No user found. Please Sign Up",
            });
            return;
        }
        const isMatch = yield (0, utils_1.comparePassword)(password, user.password);
        if (!isMatch) {
            res.status(types_1.statusCode.NOT_ACCEPTABLE).json({
                success: false,
                message: "Incorrect Password. Please enter correct password",
            });
        }
        const token = (0, utils_1.generateToken)(user._id, user.userName, user.email, user.role);
        res.status(types_1.statusCode.ACCEPTED).json({
            success: true,
            message: `${user.role === "admin" ? "Welcome back admin" : "Welcome back farmer"}`,
            token,
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while Logging in",
        });
        return;
    }
}));
exports.default = userRouter;
