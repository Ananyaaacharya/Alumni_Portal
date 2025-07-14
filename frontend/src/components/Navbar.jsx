import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; 

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar-home">
      <h1 className="heading" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
        Alumni Portal
      </h1>
      <div className="nav-buttons">
        <button onClick={() => navigate("/events")}>Events</button>
        <button onClick={() => navigate("/Jobs ")}>Jobs/Internships</button>
        <button onClick={() => alert("Posts Page")}>Posts</button>
        <button onClick={() => navigate("/directory")}>Find</button>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("role");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
