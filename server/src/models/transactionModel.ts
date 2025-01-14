import mongoose, { Schema } from "mongoose";

export interface ITransaction extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  product: string;
  price: number;
  currency: "inr";
  createdAt: Date;
}

const transactionSchema = new Schema<ITransaction>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: String,
    required: true,
    default: "Farmlytics services",
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "inr",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction =
  mongoose.models.transactions ||
  mongoose.model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
