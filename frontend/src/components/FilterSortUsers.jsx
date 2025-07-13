import React from "react";

const FilterSortUsers = ({ setSort, filterType, setFilterType, setFilterValue, branches }) => {
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setFilterValue(""); // Reset filter value on change
  };

  const handleInputChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div className="row mb-3 mt-5">
      {/* Filtering Section */}
      <div className="col-8 d-flex align-items-center justify-content-start">
        <div className="d-flex flex-row me-2 p-0">
          <h6 className="d-flex align-items-center me-2 m-0">Filter&nbsp;by:</h6>
          <select className="form-select" onChange={handleFilterChange} value={filterType}>
            <option value="branch">Branch</option>
            <option value="yearOfPassing">Passing Year</option>
          </select>
        </div>

        {filterType === "branch" ? (
          <div>
            <select className="form-select" id="branchSelect" onChange={handleInputChange}>
              <option value="">Select Branch</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <select className="form-select" id="yearSelect" onChange={handleInputChange}>
              <option value="">Select Year</option>
              {Array.from({ length: 10 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>

      {/* Sorting Section */}
      <div className="col-4 d-flex align-items-center justify-content-end">
        <h6 className="d-flex align-items-center me-2 m-0">Sort:</h6>
        <select className="form-select" id="sort" onChange={(e) => setSort(e.target.value)}>
          <option value="fullName">Name</option>
          <option value="branch">Branch</option>
          <option value="yearOfPassing">Passing Year</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortUsers;
