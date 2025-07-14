// controllers/jobController.js
import Job from "../models/Job.js";

// POST /api/jobs
export const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({ message: "Failed to create job" });
  }
};

// GET /api/jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Get Jobs Error:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// GET /api/jobs/:id
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Get Job By ID Error:", error);
    res.status(500).json({ message: "Failed to fetch job" });
  }
};
