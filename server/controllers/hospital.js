const Hospital = require("../models/hospital");
const User = require("../models/user");

const bcrpyt = require("bcryptjs");

const { roles } = require("../constants/roles");

exports.getHospitals = async (req, res, next) => {
  try {
    const hospitals = await Hospital.find().populate("doctors").exec();

    return res.status(200).json({
      message: "Successfully fetched hospitals",
      hospitals,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getHospital = async (req, res, next) => {
  const { hospitalId } = req.params;
  try {
    const hospital = await Hospital.findById(hospitalId.toString())
      .populate("doctors")
      .exec();
    return res.status(200).json({
      message: "Successfully fetched hospital",
      hospital,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getDoctors = async (req, res, next) => {
  const { hospitalId } = req.params;
  console.log(`[Hospital] hospitalId: ${hospitalId}`);

  if (!hospitalId) {
    return res.status(400).json({
      message: "Please specify a hospital id",
    });
  }
  const doctors = await User.find({ hospital: hospitalId });
  return res.status(200).json({
    message: "Successfully fetched doctors",
    doctors,
  });
};

exports.getAllDoctors = async (req, res, next) => {
  const doctors = await User.find({ role: roles.doctor });
  return res.status(200).json({
    message: "Successfully fetched doctors",
    doctors,
  });
};

exports.getDoctor = async (req, res, next) => {
  const { id } = req.body;
  const doctor = await User.findById(id);

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

exports.pushDoctor = async (req, res, next) => {
  const { doctorId, hospitalId } = req.body;
  console.log(`[Hospital] Pushing a doctor`);
  const hospital = await Hospital.findById(hospitalId);
  const doctor = await User.findById(doctorId);

  hospital.doctors.push(doctor);
  doctor.hospital = hospital;
  await hospital.save();
  await doctor.save();

  return res.status(200).json({
    message: `Successfully added doctor ${doctor.username} to hospital ${hospital.username}`,
    hospital: hospital.populate("doctors"),
  });
};

exports.popDoctor = async (req, res, next) => {
  const { doctorId, hospitalId } = req.body;
  console.log(`[Hospital] Popping a doctor`);

  const hospital = await Hospital.findById(hospitalId);
  const doctor = await User.findById(doctorId);

  doctor.hospital = null;
  hospital.doctors = hospital.doctors.filter((doctor) => {
    return doctor._id.toString() !== doctorId.toString();
  });

  await doctor.save();
  await hospital.save();

  return res.status(200).json({
    message: "Successfully deleted doctor from hospital",
    hospital: hospital.populate("doctors"),
  });
};
