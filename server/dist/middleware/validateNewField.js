"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const fieldSchema = zod_1.z.object({
    fieldName: zod_1.z.string().nonempty("Field name is required"),
    location: zod_1.z.string().nonempty("Location is required"),
    latitude: zod_1.z.string().nonempty("Latitude is required"),
    longitude: zod_1.z.string().nonempty("Longitude is required"),
    cropType: zod_1.z.string().nonempty("Crop type is required"),
    fieldArea: zod_1.z.string().nonempty("Field area is required"),
    plantingDate: zod_1.z.string().nonempty("Planting date is required"),
    harvestingDate: zod_1.z.string().nonempty("Harvesting date is required"),
    soilType: zod_1.z.string().nonempty("Soil type is required"),
    inputCost: zod_1.z.string().nonempty("Input cost is required"),
    revenue: zod_1.z.string().nonempty("Revenue is required"),
    cropHealth: zod_1.z.string().nonempty("Crop health is required"),
});
const validateField = (req, res, next) => {
    try {
        fieldSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                success: false,
                errors: error.errors.map((err) => ({
                    field: err.path[0],
                    message: err.message,
                })),
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "An unexpected error occurred",
        });
    }
};
exports.default = validateField;
