import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const fieldSchema = z.object({
  fieldName: z.string().nonempty("Field name is required"),
  location: z.string().nonempty("Location is required"),
  latitude: z.string().nonempty("Latitude is required"),
  longitude: z.string().nonempty("Longitude is required"),
  cropType: z.string().nonempty("Crop type is required"),
  fieldArea: z.string().nonempty("Field area is required"),
  plantingDate: z.string().nonempty("Planting date is required"),
  harvestingDate: z.string().nonempty("Harvesting date is required"),
  soilType: z.string().nonempty("Soil type is required"),
  inputCost: z.string().nonempty("Input cost is required"),
  revenue: z.string().nonempty("Revenue is required"),
  cropHealth: z.string().nonempty("Crop health is required"),
});

const validateField = (req: Request, res: Response, next: NextFunction) => {
  try {
    fieldSchema.parse(req.body);

    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
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

export default validateField;
