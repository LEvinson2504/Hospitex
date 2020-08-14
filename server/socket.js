const redisFunctions = require("./redis/utils");

exports.tokenSocket = (redis, io) => {
  // * EMIT -> SEND DATA
  // * ON -> RECEIVE DATA

  io.on("connection", (socket) => {
    socket.on("init", async (msg) => {
      console.log(`[init] ${msg}`);
      const len = await redisFunctions.getTokensLength(redis);
      io.sockets.emit("display-queue", len);
    });

    socket.on("register-token", async (id) => {
      // nambahin queue disini
      await redisFunctions.pushToken(redis, id);
      console.log("tokens: ");
      console.log(await redisFunctions.getTokens(redis));
      const len = await redisFunctions.getTokensLength(redis);

      io.sockets.emit("display-queue", len);
    });

    socket.on("check-token", async (id) => {});

    socket.on("cancel-token", async () => {
      // cancel token
    });

    socket.on("delete-token", async () => {
      // delete queue disini
      await redisFunctions.deleteAllTokens(redis);

      console.log(await redisFunctions.getTokens(redis));
      const len = await redisFunctions.getTokensLength(redis);

      io.sockets.emit("display-queue", len);
    });
  });
};
