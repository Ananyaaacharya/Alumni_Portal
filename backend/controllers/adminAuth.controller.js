import Admin from "../models/admin.model.js";
import Faculty from "../models/faculty.model.js";
import Student from "../models/student.model.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!["admin", "faculty", "student"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const Model = role === "admin" ? Admin : role === "faculty" ? Faculty : Student;
    const existing = await Model.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const newUser = new Model({ username, email, password, role });
    await newUser.save();

    const token = newUser.generateToken();
    res.status(201).json({ token, username, role });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) return res.status(400).json({ message: "Missing fields" });

    const Model = role === "admin" ? Admin : role === "faculty" ? Faculty : Student;
    const user = await Model.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    const token = user.generateToken();
    res.status(200).json({ token, username: user.username, role });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};
