//backend\models\user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    branch: {
      type: String,
      required: true,
    },
    yearOfPassing: {
      type: Number,
      required: true,
    },
    currentCompany: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: Number,
      default: "",
    },
    linkedinProfile: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
