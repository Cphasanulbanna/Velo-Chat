import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { generateToken } from "./../lib/utils.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Email address already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ fullName, email, password: hashedPassword });

    if (newUser) {
      // generate jwt token
      generateToken(newUser._id, res);
      await newUser.save({ isNew: true });
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: {
          _id: newUser._id,
          email: newUser.email,
          fullName: newUser.fullName,
          profilePic: newUser.profilePic,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid user data",
      });
    }

    res.render("signup");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  res.render("login");
};

export const logout = async (req, res) => {
  res.render("logout");
};
