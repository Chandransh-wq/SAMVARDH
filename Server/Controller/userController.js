import User from "../Models/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 3. Create user
    const newUser = await User.create({ name, email, password });

    // --- Generate JWT Token ---
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "10h" } // user stays logged in for 10 hours
    );

    // 4. Return response
    res.status(201).json({ 
        message: "User created successfully", 
        newUser: newUser.name,
        token    
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // --- Generate JWT Token ---
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // user stays logged in for 7 days
    );

    const { password: pwd, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ 
        message: "User logged in", 
        user: userWithoutPassword,
        token
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

