const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  ],
});

module.exports = mongoose.model("Hospital", hospitalSchema);
