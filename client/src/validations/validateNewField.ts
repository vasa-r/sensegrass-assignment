import { FieldType } from "../components/farmer/CreateField";

const validateNewField = (values: FieldType) => {
  const errors: Partial<FieldType> = {};

  if (!values.fieldName) errors.fieldName = "Field name is required";
  if (!values.location) errors.location = "Location is required";
  if (!values.latitude) errors.latitude = "Latitude is required";
  if (!values.longitude) errors.longitude = "Longitude is required";
  if (!values.cropType) errors.cropType = "Crop type is required";
  if (!values.fieldArea) errors.fieldArea = "Field area is required";
  if (!values.plantingDate) errors.plantingDate = "Planting date is required";
  if (!values.harvestingDate)
    errors.harvestingDate = "Harvesting date is required";
  if (!values.soilType) errors.soilType = "Soil type is required";
  if (!values.inputCost) errors.inputCost = "Input cost is required";
  if (!values.revenue) errors.revenue = "Revenue is required";
  if (!values.cropHealth) errors.cropHealth = "Crop health is required";

  return errors;
};

export default validateNewField;
