"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types/types");
const verifyAdminRegister = (req, res, next) => {
    try {
        const { role, referralCode } = req.body;
        if (role === "farmer") {
            next();
        }
        else if (role === "admin" && referralCode === process.env.REFERRAL_CODE) {
            next();
        }
        else {
            res
                .status(types_1.statusCode.UNAUTHORIZED)
                .json({ success: false, message: "Unauthorized to register as admin" });
            return;
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.default = verifyAdminRegister;
