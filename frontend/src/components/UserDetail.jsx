import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function UserDetail() {
  const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/users`;
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}/user-detail?id=${id}`);
        setUser(res.data);
      } catch (err) {
        setError("Failed to load user data.");
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [id]);

  if (error)
    return <p className="text-center text-danger mt-5 fw-bold">{error}</p>;
  if (!user)
    return <p className="text-center mt-5 fw-semibold">Loading user data...</p>;

  return (
    <div className="container py-5">
      <h2 className="text-center text-success mb-4">Alumni User Details</h2>
      <div className="row justify-content-center">
        <div className="col-md-8 border rounded p-4 bg-light shadow">
          {[
            { label: "Full Name", value: user.fullName },
            { label: "Email", value: user.email },
            { label: "Branch", value: user.branch },
            { label: "Year of Passing", value: user.yearOfPassing },
            { label: "Current Company", value: user.currentCompany },
            { label: "Phone Number", value: user.phoneNumber },
            { label: "LinkedIn", value: user.linkedinProfile },
          ].map((item, index) => (
            <div className="row py-2" key={index}>
              <div className="col-5 fw-semibold">{item.label}:</div>
              <div className="col-7 text-break">
                {item.value ? (
                  item.label === "LinkedIn" ? (
                    <a
                      href={item.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )
                ) : (
                  <span>—</span>
                )}
              </div>
            </div>
          ))}

          <div className="row mt-4 justify-content-center">
            <div className="col-6 d-flex justify-content-around">
              <Link
                to={`/update-user/${user._id}`}
                className="btn btn-warning fs-5"
              >
                Update
              </Link>
              <Link
                to={`/delete-user/${user._id}`}
                className="btn btn-danger fs-5"
              >
                Delete
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
