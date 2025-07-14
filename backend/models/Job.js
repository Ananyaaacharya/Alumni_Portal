// models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
  posterImage: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  applyLink: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;
