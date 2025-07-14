import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function DeleteUser() {
  const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/users`;

  const { id } = useParams(); // `id` should be the user's MongoDB `_id`
  const navigate = useNavigate();

  // Redirect to login if token not found
  useEffect(() => {
    const user = localStorage.getItem("token");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  // Trigger delete on load
  useEffect(() => {
    const deleteUser = async () => {
      const confirmDelete = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
      });

      if (confirmDelete.isConfirmed) {
        try {
          await axios.delete(`${baseUrl}/delete-user?id=${id}`);
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/");
            window.location.reload();
          });
        } catch (error) {
          console.error("Error while deleting user:", error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the user.",
            icon: "error",
          });
        }
      } else {
        navigate("/");
      }
    };

    deleteUser();
  }, [id, navigate]);

  return null;
}

export default DeleteUser;
