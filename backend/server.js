// ===== backend/server.js =====
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
//import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";

dotenv.config(); 

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://localhost:27017/alumniPortal")
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ DB Error:", err));

import userRouter from "./routes/user.router.js";  // 👈 Replaces bookRouter
app.use("/api/users", userRouter);                 // 👈 All user-related routes

import authRouter from "./routes/auth.router.js";  // 👈 Keep if admin auth/login is needed
app.use("/api/auth", authRouter);                  // 👈 For login/register

//app.use("/", userRoutes);
app.use("/events", eventRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
