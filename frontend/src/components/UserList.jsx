import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ currentUsers }) => {
  if (!Array.isArray(currentUsers)) {
    return (
      <div className="alert alert-warning mt-4 text-center">
        User list unavailable.
      </div>
    );
  }

  if (currentUsers.length === 0) {
    return (
      <div className="alert alert-info mt-4 text-center">
        No users found. Click <Link to="/add-user">here</Link> to add a new user!
      </div>
    );
  }

  return (
    <ul className="list-group mt-4 d-block">
      {/* Header Row */}
      <li className="list-group-item d-flex justify-content-between align-items-center border rounded-3 text-primary mb-3">
        <div className="col-8 d-flex fw-semibold mt-2">
          <h5 className="col-2">Name</h5>
          <h5 className="col-2">Email</h5>
          <h5 className="col-2">Branch</h5>
          <h5 className="col-2">Passing</h5>
          <h5 className="col-2">Company</h5>
        </div>
        <div className="col-4 d-flex justify-content-around mt-2">
          <h5 className="text-primary">Actions</h5>
        </div>
      </li>

      {/* User List */}
      {currentUsers.map((user) => (
        <li
          key={user._id}
          className="list-group-item d-flex align-items-center justify-content-center rounded-3 mb-2"
        >
          <div className="col-8 d-flex align-items-center justify-content-center">
            <h6 className="col-2">{user.fullName}</h6>
            <h6 className="col-2">{user.email}</h6>
            <h6 className="col-2">{user.branch}</h6>
            <h6 className="col-2">{user.yearOfPassing}</h6>
            <h6 className="col-2">{user.currentCompany}</h6>
          </div>
          <div className="col-4 d-flex justify-content-around">
            <Link to={`/user-detail/${user._id}`} className="btn btn-success">
              Details
            </Link>
            <Link to={`/update-user/${user._id}`} className="btn btn-warning">
              Update
            </Link>
            <Link to={`/delete-user/${user._id}`} className="btn btn-danger">
              Delete
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;