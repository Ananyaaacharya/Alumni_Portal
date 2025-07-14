// ===== backend/server.js =====
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// === Middlewares ===
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// === Database Connection ===
mongoose.connect("mongodb://127.0.0.1:27017/alumniPortal", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ DB Connection Error:", err));

// === Routes ===
app.use("/api/users", userRouter);   // ✅ User-related (add, fetch, search)
app.use("/api/auth", authRouter);    // ✅ Auth-related (register, login)
app.use("/events", eventRoutes);     // ✅ Events (if used in your app)

// === Server Start ===
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
