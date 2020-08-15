const Hospital = require("../models/hospital");
const User = require("../models/user");

const bcrpyt = require("bcryptjs");

const { roles } = require("../constants/roles");

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

// exports.addDoctor = async (req, res, next) => {
//   const { username, password, hospitalId } = req.body;

//   const existingDoctor = await User.findOne({ username });
//   if (existingDoctor) {
//     return res.status(409).json({
//       message: `A doctor with the username of ${username} already exists`,
//     });
//   }

//   const hashedPassword = await bcrpyt.hash(password, 12);
//   const newDoctor = await User.create({ username, password: hashedPassword });
//   try {
//     await newDoctor.save();

//     return res.status(201).json({
//       message: "Successfully added a new doctor",
//       doctor: {
//         id: newDoctor._id,
//         username: newDoctor.username,
//       },
//     });
//   } catch (err) {
//     // add error handling
//     console.log(err);
//     return res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// exports.updateDoctor = async (req, res, next) => {
//   const { id, username, password } = req.body;
//   const doctor = await User.findById(id);
//   if (!doctor) {
//     return res.status(404).json({
//       message: `A doctor with the username of ${username} doesn't exist`,
//     });
//   }

//   const hashedPassword = await bcrpyt.hash(password, 12);
//   doctor.username = username;
//   doctor.password = hashedPassword;

//   await doctor.save();
//   return res.status(200).json({
//     message: "Successfully updated doctor",
//     doctor: {
//       _id: doctor._id,
//       username: doctor.username,
//     },
//   });
// };

// exports.deleteDoctor = async (req, res, next) => {
//   const { id } = req.body;
//   const doctor = await User.findOneAndDelete({ _id: id });
//   if (!doctor) {
//     return res.status(404).json({
//       message: `A doctor with the username of ${username} was not found`,
//     });
//   }

//   return res.status(200).json({
//     message: "Doctor succesfully deleted",
//     doctor: {
//       id: doctor._id,
//       username: doctor.username,
//     },
//   });
// };

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
    hospital: hospital.populate("Doctor"),
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
    hospital: hospital.populate("Doctor"),
  });
};
