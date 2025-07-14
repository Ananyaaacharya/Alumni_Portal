import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin"], default: "admin" }
});

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compare(password, this.password);
};

adminSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, username: this.username, role: this.role },
    process.env.TOKEN_SECRET || "secret",
    { expiresIn: "1h" }
  );
};

export default mongoose.model("Admin", adminSchema);
