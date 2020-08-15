const sock = require("./constants/sockets");

const Hospital = require("./models/hospital");
const single = require("./singleSocket");

exports.tokenSocket = async (redis, io) => {
  const Hospitals = await Hospital.find();
  io.on(sock.connection, (socket) => {
    console.log(`[Socket] Re-entering socket lifecycle`);

    Hospitals.forEach((hospital) => {
      single.singleSocket(hospital._id, socket, redis, io);

      socket.on(hospital._id, async (message) => {
        console.log(`[From Client] ${message}`);
        console.log(
          "I just joined hospital with the username of",
          hospital.username
        );
      });
    });
  });
};
