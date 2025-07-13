import React, { useState } from "react";

function SearchUsers({ searchData, onSearch }) {
  const [searchValues, setSearchValues] = useState(searchData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValues);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchValues({ ...searchValues, [name]: value });
  };

  return (
    <div className="row d-flex justify-content-center mt-4">
      <div className="col-8 bg-light bg-opacity-75 p-3 rounded-3">
        <form onSubmit={handleSubmit}>
          <div className="row d-flex align-items-center justify-content-start">
            {/* Dropdown */}
            <div className="col-3">
              <select
                className="form-select focus-ring focus-ring-dark py-1 mx-2"
                name="searchType"
                value={searchValues.searchType}
                onChange={handleInputChange}
              >
                <option value="fullName">Name</option>
                <option value="email">Email</option>
                <option value="branch">Branch</option>
                <option value="yearOfPassing">Year</option>
              </select>
            </div>

            {/* Input */}
            <div className="col-6">
              <input
                type={searchValues.searchType === "yearOfPassing" ? "number" : "text"}
                className="form-control focus-ring focus-ring-dark py-1 px-2"
                name="searchInput"
                value={searchValues.searchInput}
                onChange={handleInputChange}
                placeholder={`Search by ${searchValues.searchType}`}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-3">
              <button
                type="submit"
                className="btn btn-outline-secondary w-100 fw-bold py-2 me-2"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchUsers;
