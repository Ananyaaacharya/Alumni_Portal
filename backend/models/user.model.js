import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  branch: { type: String, required: true },
  yearOfPassing: { type: Number, required: true },
  currentCompany: { type: String },
  phoneNumber: { type: Number },
  linkedinProfile: { type: String },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
