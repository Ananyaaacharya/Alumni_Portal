import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";
import jobRoutes from "./routes/jobRoutes.js"; // ✅ ADDED

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://localhost:27017/alumniPortal")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/events", eventRoutes);
app.use("/api/jobs", jobRoutes); // ✅ ADDED

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
