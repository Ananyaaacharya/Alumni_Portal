import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function JobPost() {
  const [form, setForm] = useState({
    title: "",
    companyLogo: "",
    posterImage: "",
    deadline: "",
    requirements: "",
    applyLink: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/jobs", form);
      alert("Job Posted Successfully");
      navigate("/jobs");
    } catch (err) {
      alert("Failed to post job");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Post a New Job / Internship</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="form-control my-2"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="companyLogo"
            placeholder="Company Logo URL"
            className="form-control my-2"
            value={form.companyLogo}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="posterImage"
            placeholder="Poster Image URL"
            className="form-control my-2"
            value={form.posterImage}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="deadline"
            placeholder="Deadline"
            className="form-control my-2"
            value={form.deadline}
            onChange={handleChange}
            required
          />
          <textarea
            name="requirements"
            placeholder="Requirements"
            className="form-control my-2"
            value={form.requirements}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="applyLink"
            placeholder="Apply Link"
            className="form-control my-2"
            value={form.applyLink}
            onChange={handleChange}
            required
          />
          <button className="btn btn-success mt-3" type="submit">
            Post Job
          </button>
        </form>
      </div>
    </>
  );
}

export default JobPost;
