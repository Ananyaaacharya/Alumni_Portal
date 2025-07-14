import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";
import jobRoutes from "./routes/jobRoutes.js"; // ✅ ADDED
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// === Middlewares ===
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

<<<<<<< HEAD
mongoose.connect("mongodb://localhost:27017/alumniPortal")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/events", eventRoutes);
app.use("/api/jobs", jobRoutes); // ✅ ADDED

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
=======
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
>>>>>>> 6a67689bb6f847864629a487b52493731143371c
