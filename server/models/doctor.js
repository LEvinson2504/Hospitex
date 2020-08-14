const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
