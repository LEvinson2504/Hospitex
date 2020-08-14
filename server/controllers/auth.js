const User = require("../models/user");

const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  const { username, password, type } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  if (hashedPassword) {
    if (type === "doctor") {
      const doctor = await new User({
        username,
        password: hashedPassword,
        role: "doctor",
      });
      await doctor.save();

      return res.status(200).json({
        message: "Created a doctor",
        doctor,
      });
    } else if (type === "patient") {
      const patient = await new User({
        username,
        password: hashedPassword,
        role: "patient",
      });
      await patient.save();

      return res.status(200).json({
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
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  // set session
  req.session.userId = user._id;
  console.log(req.session.userId);

  res.status(200).json({
    message: "Logged in successfully",
    user: user,
  });
};

exports.logout = async (req, res, next) => {
  if (req.session && req.session.userId) {
    req.session.destroy((err) => {
      console.log("Logging out...");
      if (err) {
        console.log(err);
      }
      res.clearCookie("token");
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
      message: "UserId",
      user: user,
    });
  } else {
    return res.status(200).json({
      message: "Not authenticated",
    });
  }
};
