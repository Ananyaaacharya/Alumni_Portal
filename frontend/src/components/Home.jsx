import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import home1 from "../assets/home1.jpg";
import home2 from "../assets/home2.jpg";
import home3 from "../assets/home3.jpg";
import home4 from "../assets/home4.jpg";
import college from "../assets/college.jpg";

function Home() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      navigate("/");
    } else {
      setAuthorized(true);
    }
  }, [navigate]);

  if (!authorized) return null; // Optionally, show a loader

  return (
    <div className="home-container">
      {/* Navbar */}
      <div className="navbar-home">
        <h1 className="heading">Welcome to Alumni Portal</h1>
        <div className="nav-buttons">
          <button onClick={() => navigate("/events")}>Events</button>
          <button onClick={() => alert("Jobs/Internships Page")}>Jobs/Internships</button>
          <button onClick={() => alert("Posts Page")}>Posts</button>
          <button onClick={() => navigate("/directory")}>Find</button><button onClick={() => navigate("/directory")}>Find</button>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              localStorage.removeItem("role");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* College Image */}
      <img src={college} alt="College" className="college-image" loading="lazy" />

      {/* Image Carousel */}
      <div className="image-carousel">
        {[home1, home2, home3, home4].map((img, i) => (
          <img key={i} src={img} alt={`Gallery ${i + 1}`} className="carousel-img" loading="lazy" />
        ))}
      </div>
    </div>
  );
}

export default Home;