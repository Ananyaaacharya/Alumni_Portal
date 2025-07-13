import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function NewUser() {
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    branch: "",
    yearOfPassing: "",
    currentCompany: "",
    phoneNumber: "",
    linkedinProfile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "yearOfPassing" || name === "phoneNumber" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, branch, yearOfPassing } = formData;
    if (!fullName || !email || !branch || !yearOfPassing) {
      Swal.fire("Error", "Please fill in all required fields", "error");
      return;
    }

    try {
 const response = await axios.post(`${baseUrl}/api/users/add-user`, formData);
console.log("Server responded with:", response.data);
      Swal.fire("Success", "User added successfully", "success").then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Error adding the user", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Something went wrong. Check console.",
        "error"
      );
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email *</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Branch *</label>
          <input
            type="text"
            className="form-control"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Year of Passing *</label>
          <input
            type="number"
            className="form-control"
            name="yearOfPassing"
            value={formData.yearOfPassing}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Current Company</label>
          <input
            type="text"
            className="form-control"
            name="currentCompany"
            value={formData.currentCompany}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Phone Number</label>
          <input
            type="number"
            className="form-control"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12">
          <label className="form-label">LinkedIn Profile</label>
          <input
            type="text"
            className="form-control"
            name="linkedinProfile"
            value={formData.linkedinProfile}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary px-4 mt-3">
            Add User
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewUser;