import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#198754",  // green
        cancelButtonColor: "#dc3545",   // red
        confirmButtonText: "Yes, log out",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // Clear local storage
          localStorage.removeItem("token");
          localStorage.removeItem("username");

          // Show success message
          Swal.fire({
            title: "Logged Out",
            text: "You have been successfully logged out.",
            icon: "success",
            confirmButtonColor: "#198754",
          }).then(() => {
            navigate("/login");
          });
        } else {
          // If cancelled, go back to home
          navigate("/");
        }
      });
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="text-center mt-5">
      <p className="text-muted">Processing logout...</p>
    </div>
  );
}

export default Logout;
