import mongoose, { Schema } from "mongoose";

interface IUser extends Document {
  userName: string;
  role: "admin" | "farmer";
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: [true, "User name is required"],
  },
  role: {
    type: String,
    enum: ["admin", "farmer"],
    default: "farmer",
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const User = mongoose.models.user || mongoose.model<IUser>("User", userSchema);

export default User;
