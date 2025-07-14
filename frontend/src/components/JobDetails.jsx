// src/components/JobDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/JobDetails.css";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";


function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

useEffect(() => {
  const fetchJob = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
      setJob(res.data);
    } catch (err) {
      console.error("Failed to fetch job details");
    }
  };
  fetchJob();
}, [id]);


  if (!job) return <p className="text-center mt-5">Loading...</p>;

  return (
    <>
    <Navbar/>
    <div className="job-details-container">
      {/* Part 1: Poster */}
    <img src={job.posterImage} alt="Job Poster" className="job-poster" />


      {/* Part 2 & 3 */}
      <div className="job-details-content">
        <div className="job-header">
          <img src={job.companyLogo} alt="Company Logo" className="details-logo" />
          <h3>{job.title}</h3>
        </div>

        {/* Part 3 */}
        <div className="job-requirements mt-3">
          <p><strong>Last Date to Apply:</strong> {job.deadline}</p>
          <p><strong>Requirements:</strong> {job.requirements}</p>
        </div>

        {/* Part 4 */}
        <div className="apply-btn-box">
          <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Apply Now
          </a>
        </div>
      </div>
    </div>
    </>
  );
}

export default JobDetails;
