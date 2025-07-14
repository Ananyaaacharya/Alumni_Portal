// backend/routes/jobRoutes.js
import express from "express";
import { createJob, getAllJobs, getJobById } from "../controllers/jobController.js";

const router = express.Router();

router.post("/", createJob); // POST /api/jobs
router.get("/", getAllJobs); // GET /api/jobs
router.get("/:id", getJobById); // GET /api/jobs/:id

export default router;
