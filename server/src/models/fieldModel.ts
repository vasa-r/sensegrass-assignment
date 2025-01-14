import mongoose, { Schema, Document } from "mongoose";

interface IField extends Document {
  fieldName: string;
  location: string;
  latitude: string;
  longitude: string;
  cropType: string;
  fieldArea: string;
  plantingDate: string;
  harvestingDate: string;
  soilType: string;
  inputCost: string;
  revenue: string;
  cropHealth: string;
  user: mongoose.Schema.Types.ObjectId;
}

const fieldSchema = new Schema<IField>(
  {
    fieldName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    cropType: {
      type: String,
      required: true,
    },
    fieldArea: {
      type: String,
      required: true,
    },
    plantingDate: {
      type: String,
      required: true,
    },
    harvestingDate: {
      type: String,
      required: true,
    },
    soilType: {
      type: String,
      required: true,
    },
    inputCost: {
      type: String,
      required: true,
    },
    revenue: {
      type: String,
      required: true,
    },
    cropHealth: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Field =
  mongoose.models.fields || mongoose.model<IField>("Field", fieldSchema);

export default Field;
