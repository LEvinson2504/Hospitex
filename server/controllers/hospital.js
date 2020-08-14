const Doctor = require("../models/doctor");

const bcrpyt = require("bcryptjs");

exports.getDoctors = (req, res, next) => {
  const doctors = await Doctor.find();
  return res.status(200).json({
    message: "Successfully fetched doctors",
    doctors
  })
};

exports.getDoctor = async (req, res, next) => {
  const { id } = req.body;
  const doctor = await Doctor.findById(id);

  if (!doctor) {
    return res.status(404).json({
      message: `A doctor with the username of ${username} was not found`,
    });
  }

  return res.status(200).json({
    message: "Doctor successfully fetched",
    doctor: {
      _id: doctor._id,
      username: doctor.username,
    },
  });
};

exports.addDoctor = async (req, res, next) => {
  const { username, password } = req.body;

  const existingDoctor = await Doctor.findOne(username);
  if (existingDoctor) {
    return res.status(409).json({
      message: `A doctor with the username of ${username} already exists`,
    });
  }

  const hashedPassword = await bcrpyt.hash(password, 12);
  const newDoctor = await Doctor.create({ username, password: hashedPassword });
  try {
    await newDoctor.save();

    return res.status(201).json({
      message: "Successfully added a new doctor",
      doctor: {
        id: newDoctor._id,
        username: newDoctor.username,
      },
    });
  } catch (err) {
    // add error handling
    console.log(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

exports.updateDoctor = async (req, res, next) => {
  const { id, username, password } = req.body;
  const doctor = await Doctor.findById(id);
  if (!doctor) {
    return res.status(404).json({
      message: `A doctor with the username of ${username} doesn't exist`,
    });
  }

  const hashedPassword = await bcrpyt.hash(password, 12);
  doctor.username = username;
  doctor.password = hashedPassword;

  await doctor.save();
  return res.status(200).json({
    message: "Successfully updated doctor",
    doctor: {
      _id: doctor._id,
      username: doctor.username,
    },
  });
};

exports.deleteDoctor = async (req, res, next) => {
  const { id } = req.body;
  const doctor = await Doctor.findOneAndDelete({ _id: id });
  if (!doctor) {
    return res.status(404).json({
      message: `A doctor with the username of ${username} was not found`,
    });
  }

  return res.status(200).json({
    message: "Doctor succesfully deleted",
    doctor: {
      id: doctor._id,
      username: doctor.username,
    },
  });
};
