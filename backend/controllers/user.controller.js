//backend\controllers\user.controller.js
import User from "../models/user.model.js";

// Add a new alumni user
const addUser = async (req, res) => {
  try {
    const userData = req.body;
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    await User.create(userData);
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error while adding user: ", error);
    res.status(500).json({ message: "An error occurred while adding user" });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    const deletedUser = await User.deleteOne({ _id: id });

    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error while deleting user: ", error);
    res.status(500).json({ message: "An error occurred while deleting user" });
  }
};

// Show user details
const detailUser = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findOne({ _id: id }, { __v: 0 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error while fetching user details: ", error);
    res.status(500).json({ message: "An error occurred while fetching user details" });
  }
};

// Get all users with filter/sort/search
const getUsers = async (req, res) => {
  try {
    const { sort, filterType, filterValue, searchType, searchInput } = req.query;
    let sortOrder = {};
    let searchCriteria = {};

    // Sort Logic
    switch (sort) {
      case "fullName":
        sortOrder = { fullName: 1 };
        break;
      case "branch":
        sortOrder = { branch: 1 };
        break;
      case "yearOfPassing":
        sortOrder = { yearOfPassing: -1 };
        break;
      default:
        sortOrder = { fullName: 1 };
    }

    // Filter Logic
    if (filterType && filterValue) {
      if (filterType === "branch") {
        searchCriteria.branch = { $regex: new RegExp(filterValue, "i") };
      } else if (filterType === "yearOfPassing") {
        searchCriteria.yearOfPassing = filterValue;
      }
    }

    // Search Logic
    if (searchType && searchInput) {
      const searchRegex = new RegExp(searchInput.trim(), "i");
      if (searchType === "fullName") {
        searchCriteria.fullName = searchRegex;
      } else if (searchType === "email") {
        searchCriteria.email = searchRegex;
      } else if (searchType === "branch") {
        searchCriteria.branch = searchRegex;
      } else if (searchType === "yearOfPassing") {
        searchCriteria.yearOfPassing = searchInput;
      }
    }

    const users = await User.find(searchCriteria, { __v: 0 }).sort(sortOrder);

    if (!users.length) {
      return res.status(404).json({ message: "No users found matching criteria" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error while fetching users: ", error);
    res.status(500).json({ message: "An error occurred while fetching users" });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const userData = req.body;
    const { _id } = userData;

    const updatedUser = await User.findOneAndUpdate({ _id }, { $set: userData }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error while updating user: ", error);
    res.status(500).json({ message: "An error occurred while updating user" });
  }
};

// Optional: Separate user search
const searchUsers = async (req, res) => {
  try {
    const { searchType, searchInput } = req.query;
    const filter = {};

    if (searchType && searchInput) {
      const regex = new RegExp(searchInput.trim(), "i");
      filter[searchType] = regex;
    }

    const users = await User.find(filter, { __v: 0 });
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error while searching users: ", error);
    res.status(500).json({ message: "An error occurred while searching users" });
  }
};

export { addUser, deleteUser, detailUser, getUsers, updateUser, searchUsers };
