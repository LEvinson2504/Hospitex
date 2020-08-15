const User = require("../models/user");
const Hospital = require("../models/hospital");

const bcrypt = require("bcryptjs");

exports.findUserById = async (req, res, next) => {
  const { userId } = req.params;
  console.log(`[Auth] Entered /:userId route`);
  const user = User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: `User with the id of ${userId} was not found`,
    });
  }

  return res.status(200).json({
    message: "Successfully fetched user",
    user,
  });
};

exports.registerHospital = async (req, res, next) => {
  const hospital = req.body;
  const { name, email, password, phone, type } = hospital;

  const existingHospital = await Hospital.findOne({ email });

  if (existingHospital) {
    return res.status(409).json({
      message: `An email with the name of ${email} already exists`,
      user,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  if (hashedPassword) {
    console.log(`[Auth] Registered a Hospital`);
    const newHospital = await Hospital.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await newHospital.save();

    return res.status(201).json({
      message: "Succesfully created an user",
      user: hospital,
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
    email: hospital.email,
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
  req.session.id = existingHospital._id;
  console.log(`[Auth] hospitalId: ${req.session.id}`);

  res.status(200).json({
    message: "Logged in successfully",
    user: existingHospital,
  });
};

exports.logoutHospital = async (req, res, next) => {
  console.log(`[Auth] hospital sessionId: ${req.session.id}`);
  if (req.session && req.session.id) {
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
  if (req.session && req.session.id) {
    const user = await User.findOne({ _id: req.session.id });
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
  const { name, email, password, phone, type, hospital } = user;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      message: `${email} already exists`,
      user,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  if (hashedPassword) {
    console.log(`[Auth] Registered an User`);
    let newUser;
    newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      role: type === "patient" ? "patient" : "doctor",
    });
    await newUser.save();

    return res.status(201).json({
      message: "Succesfully created an user",
      user: {
        _id: newUser._id,
        email: newUser.email,
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

  const existingUser = await User.findOne({ email: user.email })
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

  console.log(`[Auth] An user logged in`);
  req.session.id = existingUser._id;
  console.log(`[Auth] userId: ${req.session.id}`);

  res.status(200).json({
    message: "Logged in successfully",
    user: existingUser,
  });
};

exports.logout = async (req, res, next) => {
  console.log(`[Auth] sessionId: ${req.session.id}`);
  if (req.session && req.session.id) {
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
  } else {
    res.json({
      message: "Session of userId is not defined",
    });
  }
};

exports.me = async (req, res, next) => {
  if (req.session && req.session.id) {
    const user = await User.findOne({ _id: req.session.id });
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
