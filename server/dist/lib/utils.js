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
exports.generateToken = exports.comparePassword = exports.generateHashedPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateHashedPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        return hashedPassword;
    }
    catch (error) {
        console.log(error);
    }
});
exports.generateHashedPassword = generateHashedPassword;
const comparePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    if (!password || !hashedPassword) {
        throw new Error("password can't be empty genius");
    }
    try {
        const isMatch = yield bcrypt_1.default.compare(password, hashedPassword);
        return isMatch;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error while hashing password");
    }
});
exports.comparePassword = comparePassword;
const generateToken = (id, userName, email, role) => {
    return jsonwebtoken_1.default.sign({ id, userName, email, role }, process.env.JWT_SECRET);
};
exports.generateToken = generateToken;
