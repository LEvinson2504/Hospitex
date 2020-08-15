const User = require("../models/user");
const Hospital = require("../models/hospital");

const bcrypt = require("bcryptjs");

exports.registerHospital = async (req, res, next) => {
  const hospital = req.body;
  const { username, password } = hospital;
  const existingHospital = await Hospital.findOne({ username });

  if (existingHospital) {
    return res.status(409).json({
      message: `An username with the name of ${username} already exists`,
      user,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  if (hashedPassword) {
    console.log(`[Auth] Registered a Hospital`);
    const newHospital = await Hospital.create({
      username,
      password: hashedPassword,
    });
    await newHospital.save();

    return res.status(201).json({
      message: "Succesfully created an user",
      user: {
        _id: newHospital._id,
        username: newHospital.username,
      },
    });
  } else {
    return res.status(500).json({
      message: "Server error (500)",
    });
  }
};

exports.loginHospital = async (req, res, next) => {
  console.log("[Auth] A hospital is trying to login");
  const hospital = req.body;

  const existingHospital = await Hospital.findOne({
    username: hospital.username,
  })
    .select("+password")
    .exec();
  if (!existingHospital) {
    return res.status(404).json({
      message: "Hospital not found",
    });
  }
  const validatePassword = await bcrypt.compare(
    hospital.password,
    existingHospital.password
  );
  if (!validatePassword) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  // set session
  console.log(`[Auth] A hospital logged in`);
  req.session.hospitalId = existingHospital._id;
  console.log(`[Auth] hospitalId: ${req.session.userId}`);

  res.status(200).json({
    message: "Logged in successfully",
    user: existingHospital,
  });
};

exports.logoutHospital = async (req, res, next) => {
  console.log(`[Auth] hospital sessionId: ${req.session.hospitalId}`);
  if (req.session && req.session.hospitalId) {
    req.session.destroy((err) => {
      console.log("[Auth] A hospital is trying to logout");
      if (err) {
        console.log(err);
      }
      res.clearCookie(process.env.COOKIE_NAME);
      console.log("[Auth] A hospital logged out.");
      return res.json({
        message: "Hospital successfully logged out",
      });
    });
  }
};

exports.meHospital = async (req, res, next) => {
  if (req.session && req.session.hospitalId) {
    const user = await User.findOne({ _id: req.session.hospitalId });
    if (user) {
      return res.status(200).json({
        message: "Authentication successful",
        user: user,
      });
    }
  }
  return res.status(401).json({
    message: "Hospital is not authenticated",
  });
};

exports.register = async (req, res, next) => {
  const user = req.body;
  const { username, password, type } = user;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(409).json({
      message: `An username with the name of ${username} already exists`,
      user,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  if (hashedPassword) {
    console.log(`[Auth] Registered an User`);
    let newUser;
    newUser = await User.create({
      username,
      password: hashedPassword,
      role: type === "patient" ? "patient" : "doctor",
    });
    await newUser.save();

    return res.status(201).json({
      message: "Succesfully created an user",
      user: {
        _id: newUser._id,
        username: newUser.username,
      },
    });
  } else {
    return res.status(500).json({
      message: "Server error (500)",
    });
  }
};

exports.login = async (req, res, next) => {
  console.log("[Auth] An user is trying to login");
  const user = req.body;

  const existingUser = await User.findOne({ username: user.username })
    .select("+password")
    .exec();

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
      res.clearCookie(process.env.COOKIE_NAME);
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
