const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with that email already exists" });
    }

    const newUser = await User.create({ username, email, password });
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      token: generateToken({ id: newUser.id }),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await User.comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken({ id: user.id }),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
};

exports.getMe = async (req, res) => {
  // req.user is set by the protect middleware
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
  });
};
