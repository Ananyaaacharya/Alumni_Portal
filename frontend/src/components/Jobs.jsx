// src/components/Jobs.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Jobs.css";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";

function Jobs() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    };
    fetchJobs();
  }, []);

  const handleClick = (id) => {
    navigate(`/jobs/${id}`);
  };

  const handlePostJob = () => {
    navigate("/post-job");
  };

  return (
    <>
      <Navbar />
      <div className="jobs-container">
        <div className="d-flex justify-content-between align-items-center my-4 px-3">
          <h2 className="mb-0">Jobs & Internships</h2>
          <button className="btn btn-success" onClick={handlePostJob}>
            + Post a Job
          </button>
        </div>

        {posts.length === 0 ? (
          <p className="text-center mt-5">No jobs posted yet</p>
        ) : (
          <div className="jobs-list">
            {posts.map((post) => (
              <div key={post._id} className="job-row" onClick={() => handleClick(post._id)}>
                <img src={post.companyLogo} alt="Company Logo" className="job-logo" />
                <div className="job-info">
                  <h5 className="mb-1">{post.title}</h5>
                  <p className="mb-0 text-muted">Deadline: {post.deadline}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Jobs;