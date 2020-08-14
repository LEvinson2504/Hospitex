const User = require("../models/user");

const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  const user = req.body;
  const existingUser = await User.findOne({ username: user.username });

  if (existingUser) {
    return res.status(409).json({
      message: `An username with the name of ${user.username} already exists`,
      user,
    });
  }
  const hashedPassword = await bcrypt.hash(user.password, 12);
  if (hashedPassword) {
    console.log(`[Auth] Registered an User`);
    if (user.type === "doctor") {
      const doctor = await new User({
        username: user.username,
        password: hashedPassword,
        role: "doctor",
      });
      await doctor.save();

      return res.status(201).json({
        message: "Created a doctor",
        doctor,
      });
    } else if (user.type === "patient") {
      const patient = await new User({
        username: user.username,
        password: hashedPassword,
        role: "patient",
      });
      await patient.save();

      return res.status(201).json({
        message: "Created a patient",
        patient,
      });
    }
  } else {
    return res.status(500).json({
      message: "Server error (500)",
    });
  }
};
exports.login = async (req, res, next) => {
  console.log("[Auth] An user is trying to login");
  const user = req.body;

  const existingUser = await User.findOne({ username: user.username });
  if (!existingUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const validatePassword = await bcrypt.compare(
    user.password,
    existingUser.password
  );
  if (!validatePassword) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  // set session
  console.log(`[Auth] An user logged in`);
  req.session.userId = existingUser._id;
  console.log(`[Auth] userId: ${req.session.userId}`);

  res.status(200).json({
    message: "Logged in successfully",
    user: existingUser,
  });
};

exports.logout = async (req, res, next) => {
  console.log(`[Auth] sessionId: ${req.session.userId}`);
  if (req.session && req.session.userId) {
    req.session.destroy((err) => {
      console.log("[Auth] An user is trying to logout");
      if (err) {
        console.log(err);
      }
      res.clearCookie("token");
      console.log("[Auth] User logged out.");
      return res.json({
        message: "Logged out",
      });
    });
  }
};

exports.me = async (req, res, next) => {
  if (req.session && req.session.userId) {
    const user = await User.findOne({ _id: req.session.userId });
    return res.status(200).json({
      message: "Authentication successful",
      user: user,
    });
  } else {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }
};
