// backend/controllers/user.controller.js

import User from "../models/user.model.js";

// 1. Add User
export const addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Add user error:", error);
    res.status(500).json({ message: "Failed to add user" });
  }
};

// 2. Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// 3. Get User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// 4. Update User
export const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

// 5. Delete User
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// 6. Search Users
export const searchUsers = async (req, res) => {
  try {
    const { searchType, searchInput } = req.query;
    if (!searchType || !searchInput) {
      return res.status(400).json({ message: "Missing search parameters" });
    }

    const query = {};
    query[searchType] = { $regex: searchInput, $options: "i" };

    const users = await User.find(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};
