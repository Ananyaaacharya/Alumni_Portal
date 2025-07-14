import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function UpdateUser() {
  const baseUrl = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_USER_ROUTE}`;
  const { id } = useParams(); // Assuming your user id is passed in the URL
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}/user-detail/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        Swal.fire("Error", "Failed to load user data", "error");
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${baseUrl}/update-user/${id}`, user);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User updated successfully",
      }).then(() => navigate("/users"));
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to update user",
      });
    }
  };

  return (
    <div className="py-5 d-flex justify-content-center">
      <div className="col-5">
        <h2 className="text-center text-primary">Update User</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label fw-semibold">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              required
              pattern="\d{10}"
              title="Enter a 10-digit phone number"
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label htmlFor="address" className="form-label fw-semibold">
              Address
            </label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              value={user.address}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-success fw-semibold">
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
