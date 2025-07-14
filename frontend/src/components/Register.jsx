import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const baseUrl = "http://localhost:5000/api/auth";
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/register`, admin);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You can now login.",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login");
      });

      setAdmin({
        username: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-4 border border-3 border-secondary rounded-5 shadow-lg p-5">
        {error && (
          <div className="alert alert-danger text-center fw-semibold">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <h2 className="text-center text-secondary mb-3">Register</h2>

          <div className="mb-3">
            <label className="form-label fw-semibold">Role</label>
            <select
              name="role"
              className="form-select"
              value={admin.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="faculty">Faculty</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter username"
              value={admin.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={admin.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={admin.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-outline-secondary fw-bold">
              Register
            </button>
          </div>

          <div className="text-center mt-3">
            <span className="text-muted">Already have an account? </span>
            <button
              type="button"
              className="btn btn-link p-0 fw-bold"
              onClick={() => navigate("/login")}
            >
              Click here to login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
