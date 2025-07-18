import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const baseUrl = "http://localhost:5000";
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (token && username && role) {
      navigate("/home");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/api/auth/login`, admin);
      const { token, username, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);

      // ✅ Redirect to home page
      navigate("/home");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed.";
      setError(errorMessage);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  if (loading) return null;

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-5 border border-3 border-secondary rounded-5 shadow-lg p-5 bg-light">
        {error && (
          <div className="alert alert-danger text-center fw-semibold">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <h2 className="text-center text-primary mb-4">Login</h2>

          <div className="form-group mb-3">
            <label htmlFor="role" className="form-label fw-semibold">Login as</label>
            <select
              id="role"
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

          <div className="form-group mb-3">
            <label htmlFor="email1" className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email1"
              name="email"
              placeholder="Enter email"
              value={admin.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              value={admin.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button type="submit" className="btn btn-outline-primary fw-bold px-4">
              Login
            </button>
            <button
              type="button"
              className="btn btn-outline-success fw-bold px-4"
              onClick={handleRegisterRedirect}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
