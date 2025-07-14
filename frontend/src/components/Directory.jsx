import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import UserList from "./UserList";
import SearchUsers from "./SearchUsers";
import FilterSortUsers from "./FilterSortUsers";
import "../styles/Directory.css"; 

function Directory() {
  const baseUrl = `${process.env.REACT_APP_BASE_URL || "http://localhost:5000"}/api/users`;
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [searchData, setSearchData] = useState({ searchType: "fullName", searchInput: "" });
  const [sort, setSort] = useState("fullName");
  const [filterType, setFilterType] = useState("branch");
  const [filterValue, setFilterValue] = useState("");
  const branches = ["CSE", "ECE", "ME", "CE", "EEE"];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;

  const filteredUsers = users.filter((user) => {
    if (!filterValue) return true;
    return user[filterType] === (filterType === "yearOfPassing" ? Number(filterValue) : filterValue);
  });

const sortedUsers = [...filteredUsers].sort((a, b) => {
  const aVal = a?.[sort];
  const bVal = b?.[sort];

  if (typeof aVal === "string" && typeof bVal === "string") {
    return aVal.localeCompare(bVal);
  } else {
    return (aVal ?? 0) - (bVal ?? 0); // handles numbers and fallback for undefined
  }
});

  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/home");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(baseUrl);
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      }
    };
    fetchUsers();
  }, [baseUrl]); 

const handleSearch = async (data) => {
  const adjustedData = {
    ...data,
    searchInput: data.searchType === "yearOfPassing" ? Number(data.searchInput) : data.searchInput
  };

  try {
    const response = await axios.get(`${baseUrl}/search`, { params: adjustedData });
    setUsers(response.data);
    setError(response.data.length ? "" : "No users found.");
    setSearchData(data);
  } catch (err) {
    console.error("Error searching users:", err);
    setError("Search failed.");
  }
};

  return (
    <>
      <Navbar />
      <section className="directory-section">
        <div className="container text-center">
          <h2 className="text-dark pt-5">Alumni Directory</h2>
          <div className="d-flex justify-content-between align-items-center mb-4">
<button
  className="btn btn-success fw-semibold"
  onClick={() => navigate("/new-user")}
>
  + Add New User
</button>
</div>
          <div className="row d-flex justify-content-center">
            <div className="col-10">
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="search-bar">
                <SearchUsers searchData={searchData} onSearch={handleSearch} />
              </div>

              <div className="filter-bar">
                <FilterSortUsers
                  setSort={setSort}
                  filterType={filterType}
                  setFilterType={setFilterType}
                  setFilterValue={setFilterValue}
                  branches={branches}
                />
              </div>

              <UserList currentUsers={currentUsers} />
            </div>
          </div>

          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center mt-3">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}

export default Directory;
