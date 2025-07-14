import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const facultySchema = mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["faculty"],
    default: "faculty",
  },
});

facultySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

facultySchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

facultySchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      role: this.role,
    },
    process.env.TOKEN_SECRET || "your-secret-key",
    { expiresIn: "1h" }
  );
};

const Faculty = mongoose.model("Faculty", facultySchema);

export default Faculty;
